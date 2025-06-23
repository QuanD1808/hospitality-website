// BE/src/routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

console.log('--- prescriptionRoutes.js loaded ---');

// Tạo Prescription (DOCTOR, ADMIN)
router.post('/', protect, authorizeRoles('DOCTOR', 'ADMIN'), prescriptionController.createPrescription);

// Lấy tất cả Prescriptions (ADMIN, DOCTOR (của mình), PHARMACIST, PATIENT (của mình))
router.get('/', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'PATIENT'), prescriptionController.getAllPrescriptions);

// Lấy một Prescription theo _id
router.get('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'PATIENT'), prescriptionController.getPrescriptionById);

// Cập nhật Prescription (ADMIN, DOCTOR (của mình), PHARMACIST (chỉ status))
router.put('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST'), prescriptionController.updatePrescription);

// Xóa Prescription (chỉ ADMIN)
router.delete('/:id', protect, authorizeRoles('ADMIN'), prescriptionController.deletePrescription);

module.exports = router;