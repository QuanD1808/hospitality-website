// BE/src/routes/prescriptionDetailRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionDetailController = require('../controllers/prescriptionDetailController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

console.log('--- prescriptionDetailRoutes.js loaded ---');

// Tạo Prescription Detail (DOCTOR, ADMIN)
router.post('/', protect, authorizeRoles('DOCTOR', 'ADMIN'), prescriptionDetailController.createPrescriptionDetail);

// Lấy tất cả Prescription Details (ADMIN, DOCTOR, PHARMACIST, PATIENT)
router.get('/', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'PATIENT'), prescriptionDetailController.getAllPrescriptionDetails);

// Lấy một Prescription Detail theo _id
router.get('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'PATIENT'), prescriptionDetailController.getPrescriptionDetailById);

// Cập nhật Prescription Detail (ADMIN, DOCTOR)
router.put('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR'), prescriptionDetailController.updatePrescriptionDetail);

// Xóa Prescription Detail (ADMIN, DOCTOR)
router.delete('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR'), prescriptionDetailController.deletePrescriptionDetail);

module.exports = router;