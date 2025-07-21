// BE/src/controllers/medicineController.js
const Medicine = require('../models/Medicine');

// @desc    Tạo một Medicine mới
// @route   POST /api/medicines
// @access  Protected (ADMIN, PHARMACIST)
exports.createMedicine = async (req, res) => {
    console.log('--- createMedicine controller function called with data:', req.body);
    const { customMedicineId, name, totalPills, price } = req.body;
    try {
        let medicine = await Medicine.findOne({ customMedicineId });
        if (medicine) {
            return res.status(400).json({ message: `Medicine with custom ID '${customMedicineId}' already exists.` });
        }
        medicine = new Medicine({ customMedicineId, name, totalPills, price });
        const savedMedicine = await medicine.save();
        res.status(201).json(savedMedicine);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: `Custom Medicine ID '${customMedicineId}' already exists.` });
        }
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        console.error('Error in createMedicine:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy tất cả Medicines
// @route   GET /api/medicines
// @access  Protected (ADMIN, PHARMACIST, DOCTOR, PATIENT)
exports.getAllMedicines = async (req, res) => {
    console.log('--- getAllMedicines controller function called ---');
    try {
        const medicines = await Medicine.find();
        res.status(200).json(medicines);
    } catch (err) {
        console.error('Error in getAllMedicines:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy một Medicine theo _id
// @route   GET /api/medicines/:id
// @access  Protected (ADMIN, PHARMACIST, DOCTOR, PATIENT)
exports.getMedicineById = async (req, res) => {
    console.log('--- getMedicineById controller function called with id:', req.params.id);
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Medicine ID format' });
        }
        console.error('Error in getMedicineById:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Cập nhật một Medicine theo _id
// @route   PUT /api/medicines/:id
// @access  Protected (ADMIN, PHARMACIST)
exports.updateMedicine = async (req, res) => {
    console.log('--- updateMedicine controller function called for id:', req.params.id, 'with data:', req.body);
    try {
        const medicine = await Medicine.findById(req.params.id);
        if(!medicine){
            return res.status(404).json({ message: 'Medicine not found' });
        }

        // Admin và Pharmacist có thể cập nhật
        // Có thể thêm logic kiểm tra cụ thể hơn nếu cần
        
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json(updatedMedicine);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Medicine ID format' });
        }
        if (err.code === 11000 && err.keyPattern && err.keyPattern.customMedicineId) {
            return res.status(400).json({ message: `Custom Medicine ID '${req.body.customMedicineId}' already exists for another medicine.` });
        }
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        console.error('Error in updateMedicine:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Xóa một Medicine theo _id
// @route   DELETE /api/medicines/:id
// @access  Protected (ADMIN, PHARMACIST)
exports.deleteMedicine = async (req, res) => {
    console.log('--- deleteMedicine controller function called for id:', req.params.id);
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Medicine ID format' });
        }
        console.error('Error in deleteMedicine:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};