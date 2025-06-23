// BE/src/controllers/prescriptionDetailController.js
const PrescriptionDetail = require('../models/PrescriptionDetail');
const Prescription = require('../models/Prescription'); // Để kiểm tra quyền qua Prescription
const Medicine = require('../models/Medicine'); // Để kiểm tra medicineId

// @desc    Tạo một PrescriptionDetail mới
// @route   POST /api/prescriptiondetails
// @access  Protected (DOCTOR, ADMIN)
exports.createPrescriptionDetail = async (req, res) => {
    console.log('--- createPrescriptionDetail controller function called with data:', req.body);
    const { customPrescriptionDetailId, prescriptionId, medicineId, quantity, dosage } = req.body;
    try {
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        // Đảm bảo bác sĩ đang đăng nhập là người tạo đơn thuốc của chi tiết này (trừ Admin)
        if (req.user.role === 'DOCTOR' && prescription.doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to add details to this prescription' });
        }

        const newPrescriptionDetail = new PrescriptionDetail({
            customPrescriptionDetailId, prescriptionId, medicineId, quantity, dosage
        });
        const savedPrescriptionDetail = await newPrescriptionDetail.save();
        res.status(201).json(savedPrescriptionDetail);
    } catch (err) { /* ... (xử lý lỗi tương tự) ... */ }
};

// @desc    Lấy tất cả PrescriptionDetails (có thể lọc theo prescriptionId)
// @route   GET /api/prescriptiondetails
// @access  Protected (ADMIN, DOCTOR, PHARMACIST, PATIENT)
exports.getAllPrescriptionDetails = async (req, res) => {
    console.log('--- getAllPrescriptionDetails controller function called with query:', req.query);
    const { prescriptionId } = req.query;
    let filter = {};
    if (prescriptionId) filter.prescriptionId = prescriptionId;

    try {
        if (req.user.role === 'PATIENT' || req.user.role === 'DOCTOR') {
            if (!prescriptionId) { // Bắt buộc phải có prescriptionId nếu là patient hoặc doctor
                 return res.status(400).json({ message: 'Prescription ID is required for your role.' });
            }
            const prescription = await Prescription.findById(prescriptionId);
            if (!prescription) return res.status(404).json({ message: 'Prescription not found for filtering.' });

            if (req.user.role === 'PATIENT' && prescription.patientId.toString() !== req.user._id.toString()) {
                 return res.status(403).json({ message: 'Not authorized to view details for this prescription' });
            } else if (req.user.role === 'DOCTOR' && prescription.doctorId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to view details for this prescription' });
            }
        }
        // Pharmacist và Admin có thể xem tất cả chi tiết (nếu không có filter prescriptionId) hoặc của 1 đơn cụ thể

        const details = await PrescriptionDetail.find(filter)
            .populate({
                path: 'prescriptionId',
                populate: [
                    { path: 'patientId', select: 'fullName email' },
                    { path: 'doctorId', select: 'fullName email' }
                ]
            })
            .populate('medicineId', 'name price');
        res.status(200).json(details);
    } catch (err) { /* ... (xử lý lỗi) ... */ }
};

// @desc    Lấy một PrescriptionDetail theo _id
// @route   GET /api/prescriptiondetails/:id
// @access  Protected (ADMIN, DOCTOR, PHARMACIST, PATIENT)
exports.getPrescriptionDetailById = async (req, res) => {
    console.log('--- getPrescriptionDetailById controller function called with id:', req.params.id);
    try {
        const detail = await PrescriptionDetail.findById(req.params.id)
            .populate({ path: 'prescriptionId', populate: [{ path: 'patientId', select: 'fullName' }, { path: 'doctorId', select: 'fullName' }]})
            .populate('medicineId', 'name');
        if (!detail) { /* ... (404) ... */ }

        // Phân quyền
        if (req.user.role === 'PATIENT' && detail.prescriptionId.patientId._id.toString() !== req.user._id.toString()) {
             return res.status(403).json({ message: 'Not authorized' });
        }
        if (req.user.role === 'DOCTOR' && detail.prescriptionId.doctorId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.status(200).json(detail);
    } catch (err) { /* ... (xử lý lỗi) ... */ }
};

// @desc    Cập nhật một PrescriptionDetail theo _id
// @route   PUT /api/prescriptiondetails/:id
// @access  Protected (ADMIN, DOCTOR)
exports.updatePrescriptionDetail = async (req, res) => {
    console.log('--- updatePrescriptionDetail controller function called for id:', req.params.id, 'with data:', req.body);
    try {
        const detail = await PrescriptionDetail.findById(req.params.id).populate('prescriptionId');
        if (!detail) { /* ... (404) ... */ }

        if (req.user.role === 'DOCTOR' && detail.prescriptionId.doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this prescription detail' });
        }
        
        const updatedDetail = await PrescriptionDetail.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        ).populate('prescriptionId').populate('medicineId');
        res.status(200).json(updatedDetail);
    } catch (err) { /* ... (xử lý lỗi) ... */ }
};

// @desc    Xóa một PrescriptionDetail theo _id
// @route   DELETE /api/prescriptiondetails/:id
// @access  Protected (ADMIN, DOCTOR)
exports.deletePrescriptionDetail = async (req, res) => {
     console.log('--- deletePrescriptionDetail controller function called for id:', req.params.id);
    try {
        const detail = await PrescriptionDetail.findById(req.params.id).populate('prescriptionId');
        if (!detail) { /* ... (404) ... */ }

        if (req.user.role === 'DOCTOR' && detail.prescriptionId.doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this prescription detail' });
        }
        await PrescriptionDetail.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Prescription detail deleted successfully' });
    } catch (err) { /* ... (xử lý lỗi) ... */ }
};