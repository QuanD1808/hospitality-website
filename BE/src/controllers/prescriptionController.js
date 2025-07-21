// src/controllers/prescriptionController.js
const Prescription = require('../models/Prescription');
const User = require('../models/User'); // Để kiểm tra patientId và doctorId là User hợp lệ
const PrescriptionDetail = require('../models/PrescriptionDetail');
const Medicine = require('../models/Medicine');

// @desc    Tạo một Prescription mới
// @route   POST /api/prescriptions
// @access  DOCTOR, ADMIN
exports.createPrescription = async (req, res) => {
    console.log('\n========== CREATE PRESCRIPTION REQUEST ==========');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Auth user:', req.user ? `ID: ${req.user._id}, Role: ${req.user.role}` : 'Not authenticated');
    console.log('Headers:', JSON.stringify({
        authorization: req.headers.authorization ? 'Present' : 'Missing',
        contentType: req.headers['content-type']
    }, null, 2));
    
    try {
        const { customPrescriptionId, patientId, doctorId, diagnosis, date, status } = req.body;
        
        // Debug thông tin gửi tới
        console.log('Prescription Data received:');
        console.log('- customPrescriptionId:', customPrescriptionId);
        console.log('- patientId:', patientId);
        console.log('- doctorId:', doctorId);
        console.log('- diagnosis:', diagnosis);
        console.log('- date:', date);
        console.log('- status:', status);
        
        // Validate required fields
        if (!customPrescriptionId || !patientId || !doctorId || !diagnosis) {
            console.log('>>> Missing required fields in prescription data');
            return res.status(400).json({ message: 'All fields are required', 
                missing: {
                    customPrescriptionId: !customPrescriptionId,
                    patientId: !patientId, 
                    doctorId: !doctorId, 
                    diagnosis: !diagnosis
                } 
            });
        }
        
        // Kiểm tra patientId và doctorId có tồn tại và đúng vai trò không
        try {
            const patient = await User.findById(patientId);
            console.log('>>> Patient check:', patient ? `Found: ${patient.fullName}` : 'Not found');
            
            if (!patient) {
                return res.status(404).json({ message: `Patient with ID ${patientId} not found` });
            }
            
            if (patient.role !== 'PATIENT') {
                return res.status(400).json({ message: `User ${patientId} is not a patient` });
            }
            
            const doctor = await User.findById(doctorId);
            console.log('>>> Doctor check:', doctor ? `Found: ${doctor.fullName}` : 'Not found');
            
            if (!doctor) {
                return res.status(404).json({ message: `Doctor with ID ${doctorId} not found` });
            }
            
            if (doctor.role !== 'DOCTOR') {
                return res.status(400).json({ message: `User ${doctorId} is not a doctor` });
            }
        } catch (idError) {
            console.error('>>> Error validating IDs:', idError);
            return res.status(400).json({ message: 'Invalid ID format', error: idError.message });
        }

        // Đảm bảo bác sĩ đang đăng nhập là người tạo đơn thuốc này, hoặc là admin
        if (req.user.role === 'DOCTOR' && doctorId.toString() !== req.user._id.toString()) {
            console.log('>>> Authorization failed: Doctor ID mismatch');
            console.log(`>>> Request doctor ID: ${doctorId}, Authenticated user ID: ${req.user._id}`);
            return res.status(403).json({ message: 'Not authorized to create prescriptions for other doctors' });
        }

        const newPrescription = new Prescription({
            customPrescriptionId, 
            patientId,
            doctorId,
            diagnosis, 
            date: date || new Date(),
            status: status || 'PENDING_DISPENSE'
        });
        
        console.log('>>> Attempting to save prescription to MongoDB');
        console.log('>>> Prescription object:', JSON.stringify(newPrescription, null, 2));
        
        const savedPrescription = await newPrescription.save();
        console.log('>>> Prescription saved successfully:', savedPrescription._id);
        
        res.status(201).json(savedPrescription);
    } catch (err) {
        console.error('Error in createPrescription:', err);
        
        if (err.code === 11000 && err.keyPattern && err.keyPattern.customPrescriptionId) {
            return res.status(400).json({ message: 'Custom Prescription ID already exists.' });
        }
        
        // Log chi tiết hơn về lỗi
        console.error('Error details:', JSON.stringify(err, null, 2));
        
        res.status(500).json({ 
            message: 'Server Error when creating prescription', 
            details: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        });
    }
};

// @desc    Lấy tất cả Prescriptions
// @route   GET /api/prescriptions
// @access  ADMIN, DOCTOR (của mình), PHARMACIST, PATIENT (của mình), RECEPTIONIST
exports.getAllPrescriptions = async (req, res) => {
    const { patientId, doctorId, status, startDate, endDate } = req.query; // Lọc theo patientId, doctorId, status, date
    let filter = {};

    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (status) filter.status = status;
    
    // Add date filtering capability
    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    try {
        // Phân quyền đặc biệt:
        if (req.user.role === 'PATIENT') {
            filter.patientId = req.user._id; // Patient chỉ xem đơn thuốc của chính họ
        } else if (req.user.role === 'DOCTOR') {
            filter.doctorId = req.user._id; // Doctor chỉ xem đơn thuốc của chính họ
        } 
        // ADMIN, PHARMACIST và RECEPTIONIST có thể xem tất cả đơn thuốc (với các filter từ query)

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
// @access  ADMIN, DOCTOR (của mình), PHARMACIST, PATIENT (của mình), RECEPTIONIST
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
        // ADMIN, PHARMACIST và RECEPTIONIST có thể xem tất cả đơn thuốc

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

// @desc    Tính doanh thu từ các đơn thuốc đã phát (DISPENSED)
// @route   GET /api/prescriptions/revenue
// @access  ADMIN, PHARMACIST
exports.calculateRevenue = async (req, res) => {
    console.log('\n========== CALCULATE REVENUE REQUEST ==========');
    console.log('Request query:', JSON.stringify(req.query, null, 2));
    console.log('Auth user:', req.user ? `ID: ${req.user._id}, Role: ${req.user.role}` : 'Not authenticated');
    
    try {
        const { startDate, endDate } = req.query;
        let dateFilter = { status: 'DISPENSED' };
        
        // Add date filtering if provided
        if (startDate || endDate) {
            dateFilter.date = {};
            if (startDate) dateFilter.date.$gte = new Date(startDate);
            if (endDate) dateFilter.date.$lte = new Date(endDate);
            
            // If endDate is provided but not with time, set it to end of day
            if (endDate && endDate.length === 10) {  // YYYY-MM-DD format
                const endOfDay = new Date(endDate);
                endOfDay.setHours(23, 59, 59, 999);
                dateFilter.date.$lte = endOfDay;
            }
        }
        
        console.log('Applying filters:', JSON.stringify(dateFilter, null, 2));
        
        // Get all dispensed prescriptions within the date range
        const prescriptions = await Prescription.find(dateFilter);
        console.log(`Found ${prescriptions.length} dispensed prescriptions`);
        
        let totalRevenue = 0;
        let medicineDetails = [];
        let dailyRevenue = {};
        
        // Calculate revenue for each prescription by summing up all medicine prices
        for (const prescription of prescriptions) {
            // Get prescription details for this prescription
            const details = await PrescriptionDetail.find({ prescriptionId: prescription._id });
            console.log(`Found ${details.length} details for prescription ${prescription._id}`);
            
            // Get the date of this prescription for daily breakdown
            const prescriptionDate = prescription.date.toISOString().split('T')[0];
            if (!dailyRevenue[prescriptionDate]) {
                dailyRevenue[prescriptionDate] = 0;
            }
            
            // For each detail, get medicine price and calculate subtotal
            for (const detail of details) {
                const medicine = await Medicine.findById(detail.medicineId);
                if (medicine) {
                    const subtotal = medicine.price * detail.quantity;
                    totalRevenue += subtotal;
                    
                    // Add to daily revenue
                    dailyRevenue[prescriptionDate] += subtotal;
                    
                    // Add to medicine details for reporting
                    medicineDetails.push({
                        medicineId: medicine._id,
                        name: medicine.name,
                        price: medicine.price,
                        quantity: detail.quantity,
                        subtotal: subtotal
                    });
                }
            }
        }
        
        // Calculate yearly revenue (current year)
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
        
        // Check if we need to calculate for a specific year
        const yearFromQuery = startDate && startDate.length >= 4 ? new Date(startDate).getFullYear() : null;
        
        const yearToUse = yearFromQuery || currentYear;
        const startOfTargetYear = new Date(yearToUse, 0, 1);
        const endOfTargetYear = new Date(yearToUse, 11, 31, 23, 59, 59);
        
        let yearFilter = { status: 'DISPENSED' };
        if (yearFromQuery) {
            yearFilter.date = { $gte: startOfTargetYear, $lte: endOfTargetYear };
        } else {
            yearFilter.date = { $gte: startOfYear, $lte: endOfYear };
        }
        
        const yearlyPrescriptions = await Prescription.find(yearFilter);
        
        let yearlyRevenue = 0;
        for (const prescription of yearlyPrescriptions) {
            const details = await PrescriptionDetail.find({ prescriptionId: prescription._id });
            for (const detail of details) {
                const medicine = await Medicine.findById(detail.medicineId);
                if (medicine) {
                    yearlyRevenue += medicine.price * detail.quantity;
                }
            }
        }
        
        // Calculate monthly revenue (current month)
        const currentMonth = new Date().getMonth();
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
        
        const monthlyPrescriptions = await Prescription.find({
            status: 'DISPENSED',
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });
        
        let monthlyRevenue = 0;
        for (const prescription of monthlyPrescriptions) {
            const details = await PrescriptionDetail.find({ prescriptionId: prescription._id });
            for (const detail of details) {
                const medicine = await Medicine.findById(detail.medicineId);
                if (medicine) {
                    monthlyRevenue += medicine.price * detail.quantity;
                }
            }
        }
        
        // Convert dailyRevenue object to array format
        const dailyRevenueArray = Object.entries(dailyRevenue).map(([date, amount]) => ({
            date,
            amount
        }));
        
        res.status(200).json({
            totalAmount: totalRevenue,
            medicineDetails: medicineDetails,
            yearlyRevenue,
            monthlyRevenue,
            dailyBreakdown: dailyRevenueArray,
            filters: {
                startDate: startDate || null,
                endDate: endDate || null,
                year: yearFromQuery || currentYear
            }
        });
    } catch (err) {
        console.error('Error in calculateRevenue:', err);
        res.status(500).json({ 
            message: 'Server Error when calculating revenue', 
            details: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        });
    }
};

// @desc    Tính doanh thu cho một đơn thuốc cụ thể
// @route   GET /api/prescriptions/:id/revenue
// @access  ADMIN, PHARMACIST
exports.calculatePrescriptionRevenue = async (req, res) => {
    console.log('\n========== CALCULATE PRESCRIPTION REVENUE REQUEST ==========');
    console.log('Prescription ID:', req.params.id);
    console.log('Auth user:', req.user ? `ID: ${req.user._id}, Role: ${req.user.role}` : 'Not authenticated');
    
    try {
        const prescriptionId = req.params.id;
        
        // Kiểm tra đơn thuốc tồn tại không
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        
        // Lấy chi tiết đơn thuốc
        const details = await PrescriptionDetail.find({ prescriptionId });
        console.log(`Found ${details.length} details for prescription ${prescriptionId}`);
        
        let totalAmount = 0;
        const medicines = [];
        
        // Tính toán doanh thu từ đơn thuốc này
        for (const detail of details) {
            const medicine = await Medicine.findById(detail.medicineId);
            if (medicine) {
                const subtotal = medicine.price * detail.quantity;
                totalAmount += subtotal;
                
                medicines.push({
                    id: medicine._id,
                    name: medicine.name,
                    price: medicine.price,
                    quantity: detail.quantity,
                    total: subtotal
                });
            }
        }
        
        // Calculate monthly revenue for context (optional)
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
        
        const monthlyPrescriptions = await Prescription.find({
            status: 'DISPENSED',
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });
        
        let monthlyRevenue = 0;
        for (const p of monthlyPrescriptions) {
            const pDetails = await PrescriptionDetail.find({ prescriptionId: p._id });
            for (const detail of pDetails) {
                const medicine = await Medicine.findById(detail.medicineId);
                if (medicine) {
                    monthlyRevenue += medicine.price * detail.quantity;
                }
            }
        }
        
        // Calculate yearly revenue for context (optional)
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
        
        const yearlyPrescriptions = await Prescription.find({
            status: 'DISPENSED',
            date: { $gte: startOfYear, $lte: endOfYear }
        });
        
        let yearlyRevenue = 0;
        for (const p of yearlyPrescriptions) {
            const pDetails = await PrescriptionDetail.find({ prescriptionId: p._id });
            for (const detail of pDetails) {
                const medicine = await Medicine.findById(detail.medicineId);
                if (medicine) {
                    yearlyRevenue += medicine.price * detail.quantity;
                }
            }
        }
        
        res.status(200).json({
            prescriptionId,
            totalAmount,
            medicines,
            monthlyRevenue,
            yearlyRevenue
        });
    } catch (err) {
        console.error('Error in calculatePrescriptionRevenue:', err);
        res.status(500).json({ 
            message: 'Server Error when calculating prescription revenue', 
            details: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        });
    }
};