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
    
    // Kiểm tra các trường bắt buộc
    if (!customPrescriptionDetailId || !prescriptionId || !medicineId || !quantity || !dosage) {
        return res.status(400).json({ 
            message: 'Missing required fields',
            requiredFields: ['customPrescriptionDetailId', 'prescriptionId', 'medicineId', 'quantity', 'dosage']
        });
    }
    
    try {
        // Kiểm tra đơn thuốc có tồn tại không
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        
        // Kiểm tra thuốc có tồn tại không
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        // Đảm bảo bác sĩ đang đăng nhập là người tạo đơn thuốc của chi tiết này (trừ Admin)
        if (req.user.role === 'DOCTOR' && prescription.doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to add details to this prescription' });
        }

        // Kiểm tra xem đã tồn tại chi tiết với customPrescriptionDetailId này chưa
        const existingDetail = await PrescriptionDetail.findOne({ customPrescriptionDetailId });
        if (existingDetail) {
            return res.status(400).json({ message: `PrescriptionDetail with ID ${customPrescriptionDetailId} already exists` });
        }

        // Tạo chi tiết đơn thuốc mới
        const newPrescriptionDetail = new PrescriptionDetail({
            customPrescriptionDetailId, 
            prescriptionId, 
            medicineId, 
            quantity, 
            dosage
        });
        
        // Lưu chi tiết đơn thuốc
        const savedPrescriptionDetail = await newPrescriptionDetail.save();
        
        // Trả về chi tiết đơn thuốc đã lưu kèm thông tin thuốc
        const detailWithMedicineInfo = await PrescriptionDetail.findById(savedPrescriptionDetail._id)
            .populate('medicineId', 'name price')
            .populate({
                path: 'prescriptionId',
                select: 'customPrescriptionId diagnosis status',
                populate: {
                    path: 'patientId',
                    select: 'fullName'
                }
            });
            
        res.status(201).json(detailWithMedicineInfo);
    } catch (err) {
        console.error('Error in createPrescriptionDetail:', err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
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
        // RECEPTIONIST, Pharmacist và Admin có thể xem tất cả chi tiết (nếu không có filter prescriptionId) hoặc của 1 đơn cụ thể

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
        // RECEPTIONIST, PHARMACIST và ADMIN có thể xem tất cả chi tiết
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

// @desc    Tạo nhiều PrescriptionDetail cùng lúc (batch creation)
// @route   POST /api/prescriptiondetails/batch
// @access  Protected (DOCTOR, ADMIN)
exports.createBatchPrescriptionDetails = async (req, res) => {
    console.log('>>> createBatchPrescriptionDetails called with body:', JSON.stringify(req.body, null, 2));
    console.log('>>> Auth headers:', req.headers.authorization ? 'Present' : 'Missing');
    
    const { prescriptionId, details } = req.body;
    
    // Debug thông tin gửi tới
    console.log('>>> prescriptionId:', prescriptionId);
    console.log('>>> details length:', details?.length || 0);
    
    // Validate request data
    if (!prescriptionId || !details || !Array.isArray(details) || details.length === 0) {
        console.log('>>> Missing or invalid request data');
        return res.status(400).json({ 
            message: 'Invalid request data. prescriptionId and details array are required.',
            received: {
                prescriptionId: prescriptionId || 'missing',
                details: details ? (Array.isArray(details) ? `array with ${details.length} items` : typeof details) : 'missing'
            }
        });
    }

    try {
        // Verify prescription exists
        console.log('>>> Looking up prescription with ID:', prescriptionId);
        let prescription;
        try {
            prescription = await Prescription.findById(prescriptionId);
            console.log('>>> Prescription lookup result:', prescription ? 'Found' : 'Not found');
        } catch (findError) {
            console.error('>>> Error finding prescription:', findError);
            return res.status(400).json({
                message: 'Invalid prescription ID format',
                error: findError.message
            });
        }
        
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // Ensure doctor is authorized to add details to this prescription (except admin)
        if (req.user.role === 'DOCTOR' && prescription.doctorId.toString() !== req.user._id.toString()) {
            console.log('>>> Authorization failed: Doctor IDs do not match');
            console.log(`>>> Prescription doctor ID: ${prescription.doctorId}, User ID: ${req.user._id}`);
            return res.status(403).json({ message: 'Not authorized to add details to this prescription' });
        }

        // Log the medicine IDs for debugging
        console.log('>>> Medicine IDs received:', details.map(detail => ({ 
            id: detail.medicineId, 
            type: typeof detail.medicineId 
        })));

        // Validate each detail object before processing
        const validDetails = [];
        const invalidDetails = [];

        for (const detail of details) {
            console.log('>>> Processing detail:', detail);
            
            // Check required fields
            if (!detail.customPrescriptionDetailId || !detail.medicineId || 
                detail.quantity === undefined || !detail.dosage) {
                console.error('>>> Invalid detail object - missing fields:', detail);
                invalidDetails.push({
                    ...detail,
                    reason: 'Missing required fields',
                    missing: {
                        customPrescriptionDetailId: !detail.customPrescriptionDetailId,
                        medicineId: !detail.medicineId,
                        quantity: detail.quantity === undefined,
                        dosage: !detail.dosage
                    }
                });
                continue;
            }

            // Check if medicine exists
            try {
                console.log('>>> Looking up medicine with ID:', detail.medicineId);
                const medicine = await Medicine.findById(detail.medicineId);
                if (!medicine) {
                    console.error(`>>> Medicine with ID ${detail.medicineId} not found`);
                    invalidDetails.push({
                        ...detail,
                        reason: `Medicine with ID ${detail.medicineId} not found`
                    });
                    continue;
                }
                console.log(`>>> Medicine found: ${medicine.name}`);
                
                // Đảm bảo trường dosage luôn có giá trị hợp lý
                const dosage = detail.dosage && detail.dosage.trim() 
                    ? detail.dosage.trim() 
                    : 'Dùng theo chỉ dẫn của bác sĩ';
                
                validDetails.push({
                    customPrescriptionDetailId: detail.customPrescriptionDetailId,
                    prescriptionId,
                    medicineId: detail.medicineId,
                    quantity: detail.quantity,
                    dosage: dosage
                });
                console.log('>>> Detail validated successfully');
            } catch (err) {
                console.error(`>>> Error validating medicine ${detail.medicineId}:`, err);
                invalidDetails.push({
                    ...detail,
                    reason: `Error validating medicine: ${err.message}`
                });
            }
        }

        if (validDetails.length === 0) {
            console.log('>>> No valid details to save');
            return res.status(400).json({
                message: 'No valid prescription details to create',
                invalidDetails
            });
        }

        console.log(`>>> Attempting to insert ${validDetails.length} valid details`);
        
        // Insert all valid details in one operation
        const savedDetails = await PrescriptionDetail.insertMany(validDetails);
        
        console.log(`>>> Successfully saved ${savedDetails.length} prescription details`);
        
        res.status(201).json({
            message: `Successfully created ${savedDetails.length} prescription details`,
            data: savedDetails,
            invalidCount: invalidDetails.length,
            invalidDetails: invalidDetails.length > 0 ? invalidDetails : undefined
        });
    } catch (err) {
        console.error('>>> Error in createBatchPrescriptionDetails:', err);
        
        // Xử lý các lỗi validation từ MongoDB
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ 
                message: 'Validation error',
                details: messages.join(', ')
            });
        }
        
        // Xử lý các lỗi từ MongoDB khác
        if (err.name === 'MongoError' || err.name === 'MongoServerError') {
            // Duplicate key error
            if (err.code === 11000) {
                return res.status(400).json({
                    message: 'Duplicate entry found',
                    details: err.message
                });
            }
        }
        
        // Log chi tiết lỗi để debug
        console.error('>>> Full error object:', JSON.stringify(err, null, 2));
        
        res.status(500).json({ 
            message: 'Server error when creating batch prescription details',
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        });
    }
};