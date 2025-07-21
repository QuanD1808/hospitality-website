// BE/src/routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

console.log('--- prescriptionRoutes.js loaded ---');

// Tạo Prescription (DOCTOR, ADMIN)
router.post('/', protect, authorizeRoles('DOCTOR', 'ADMIN'), prescriptionController.createPrescription);

// Lấy tất cả Prescriptions (ADMIN, DOCTOR (của mình), PHARMACIST, PATIENT (của mình), RECEPTIONIST)
router.get('/', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'PATIENT', 'RECEPTIONIST'), prescriptionController.getAllPrescriptions);

// Tính doanh thu từ các đơn thuốc đã phát
router.get('/revenue', protect, authorizeRoles('ADMIN', 'PHARMACIST'), prescriptionController.calculateRevenue);

// Lấy một Prescription theo _id
router.get('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'PATIENT', 'RECEPTIONIST'), prescriptionController.getPrescriptionById);

// Tính doanh thu cho một đơn thuốc cụ thể
router.get('/:id/revenue', protect, authorizeRoles('ADMIN', 'PHARMACIST'), prescriptionController.calculatePrescriptionRevenue);

// Cập nhật Prescription (ADMIN, DOCTOR (của mình), PHARMACIST (chỉ status))
router.put('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST'), prescriptionController.updatePrescription);

// Xóa Prescription (chỉ ADMIN)
router.delete('/:id', protect, authorizeRoles('ADMIN'), prescriptionController.deletePrescription);

module.exports = router;