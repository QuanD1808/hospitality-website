// BE/src/routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

console.log('--- medicineRoutes.js loaded ---');

// Tạo thuốc mới (ADMIN, PHARMACIST)
router.post('/', protect, authorizeRoles('ADMIN', 'PHARMACIST'), medicineController.createMedicine);

// Lấy tất cả thuốc (Mọi người đã đăng nhập có thể xem danh mục thuốc)
router.get('/', protect, authorizeRoles('ADMIN', 'PHARMACIST', 'DOCTOR', 'PATIENT'), medicineController.getAllMedicines);

// Lấy một thuốc theo _id (Mọi người đã đăng nhập có thể xem)
router.get('/:id', protect, authorizeRoles('ADMIN', 'PHARMACIST', 'DOCTOR', 'PATIENT'), medicineController.getMedicineById);

// Cập nhật thuốc (ADMIN, PHARMACIST)
router.put('/:id', protect, authorizeRoles('ADMIN', 'PHARMACIST'), medicineController.updateMedicine);

// Xóa thuốc (ADMIN, PHARMACIST)
router.delete('/:id', protect, authorizeRoles('ADMIN', 'PHARMACIST'), medicineController.deleteMedicine);

module.exports = router;