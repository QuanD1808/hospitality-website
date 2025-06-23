// src/controllers/prescriptionController.js
const Prescription = require('../models/Prescription');
const User = require('../models/User'); // Để kiểm tra patientId và doctorId là User hợp lệ

// @desc    Tạo một Prescription mới
// @route   POST /api/prescriptions
// @access  DOCTOR, ADMIN
exports.createPrescription = async (req, res) => {
    const { customPrescriptionId, patientId, doctorId, diagnosis, date, status } = req.body;

    try {
        // Kiểm tra patientId và doctorId có tồn tại và đúng vai trò không
        const patient = await User.findById(patientId);
        if (!patient || patient.role !== 'PATIENT') {
            return res.status(404).json({ message: 'Patient user not found or not a patient' });
        }
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'DOCTOR') {
            return res.status(404).json({ message: 'Doctor user not found or not a doctor' });
        }

        // Đảm bảo bác sĩ đang đăng nhập là người tạo đơn thuốc này
        if (req.user.role === 'DOCTOR' && doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to create prescriptions for other doctors' });
        }

        const newPrescription = new Prescription({
            customPrescriptionId, patientId, doctorId, diagnosis, date, status
        });
        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.customPrescriptionId) {
            return res.status(400).json({ message: 'Custom Prescription ID already exists.' });
        }
        res.status(400).json({ message: err.message });
    }
};

// @desc    Lấy tất cả Prescriptions
// @route   GET /api/prescriptions
// @access  ADMIN, DOCTOR (của mình), PHARMACIST, PATIENT (của mình)
exports.getAllPrescriptions = async (req, res) => {
    const { patientId, doctorId, status } = req.query; // Lọc theo patientId, doctorId, status
    let filter = {};

    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (status) filter.status = status;

    try {
        // Phân quyền đặc biệt:
        if (req.user.role === 'PATIENT') {
            filter.patientId = req.user._id; // Patient chỉ xem đơn thuốc của chính họ
        } else if (req.user.role === 'DOCTOR') {
            filter.doctorId = req.user._id; // Doctor chỉ xem đơn thuốc của chính họ
        }

        const prescriptions = await Prescription.find(filter)
            // KẾT HỢP DỮ LIỆU: Lấy thông tin chi tiết của Patient (là một User)
            .populate('patientId', 'fullName phone username email') // Chọn các trường cụ thể từ User
            // KẾT HỢP DỮ LIỆU: Lấy thông tin chi tiết của Doctor (là một User)
            .populate('doctorId', 'fullName phone username email'); // Chọn các trường cụ thể từ User

        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Lấy một Prescription theo _id
// @route   GET /api/prescriptions/:id
// @access  ADMIN, DOCTOR (của mình), PHARMACIST, PATIENT (của mình)
exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            // KẾT HỢP DỮ LIỆU: Lấy thông tin chi tiết của Patient và Doctor
            .populate('patientId', 'fullName phone username email')
            .populate('doctorId', 'fullName phone username email');

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // Phân quyền đặc biệt: Patient/Doctor chỉ xem đơn thuốc của mình
        if (req.user.role === 'PATIENT' && prescription.patientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this prescription' });
        } else if (req.user.role === 'DOCTOR' && prescription.doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this prescription' });
        }

        res.status(200).json(prescription);
    } catch (err) {
        // ... error handling
    }
};

// @desc    Cập nhật một Prescription theo _id
// @route   PUT /api/prescriptions/:id
// @access  ADMIN, DOCTOR (của mình), PHARMACIST
exports.updatePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // Admin có thể cập nhật mọi thứ.
        // Doctor chỉ có thể cập nhật đơn thuốc của mình (trước khi phát thuốc).
        // Pharmacist chỉ có thể cập nhật status thành 'DISPENSED' của đơn thuốc.
        if (req.user.role === 'DOCTOR' && prescription.doctorId.toString() !== req.user._id.toString()) {
            // Logic cho bác sĩ chỉ cập nhật của mình
            // Có thể hạn chế các trường mà bác sĩ có thể cập nhật
        } else if (req.user.role === 'PHARMACIST') {
            // Pharmacist chỉ có thể cập nhật trạng thái (status)
            const allowedPharmacistUpdates = ['status'];
            Object.keys(req.body).forEach(key => {
                if (!allowedPharmacistUpdates.includes(key)) {
                    delete req.body[key];
                }
            });
            if (req.body.status && req.body.status !== 'DISPENSED' && req.body.status !== 'CANCELLED') {
                return res.status(403).json({ message: 'Pharmacist can only set status to DISPENSED or CANCELLED' });
            }
        }
        // Admin có thể cập nhật bất kỳ trường nào.

        const updatedPrescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('patientId', 'fullName email phone')
         .populate('doctorId', 'fullName email phone');

        res.status(200).json(updatedPrescription);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Prescription ID format' });
        }
        if (err.code === 11000 && err.keyPattern && err.keyPattern.customPrescriptionId) {
            return res.status(400).json({ message: 'Custom Prescription ID already exists.' });
        }
        res.status(400).json({ message: err.message });
    }
};

// @desc    Xóa một Prescription theo _id
// @route   DELETE /api/prescriptions/:id
// @access  ADMIN
exports.deletePrescription = async (req, res) => {
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!deletedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Prescription ID format' });
        }
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};