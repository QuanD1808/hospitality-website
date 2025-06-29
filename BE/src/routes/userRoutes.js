// BE/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', protect, userController.getMe);
router.get('/validate-token', protect, userController.validateToken); // Thêm endpoint xác thực token
router.get('/patients', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST'), userController.getAllPatients); // Endpoint lấy danh sách bệnh nhân
router.get('/doctors', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST'), userController.getAllDoctors); // Endpoint lấy danh sách bác sĩ

// Route để tạo người dùng mới bởi nhân viên (khác với self-register)
router.post('/', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST'), userController.createUser);

router.get('/', protect, authorizeRoles('ADMIN'), userController.getAllUsers);
router.get('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'PATIENT'), userController.getUserById); // Cho phép nhiều role xem
router.get('/custom/:userId', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'PATIENT'), userController.getUserByCustomId);
router.put('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'PATIENT'), userController.updateUser); // Cho phép nhiều role cập nhật (với logic phân quyền trong controller)
router.delete('/:id', protect, authorizeRoles('ADMIN', 'RECEPTIONIST'), userController.deleteUser); // Cho phép RECEPTIONIST truy cập, nhưng quyền sẽ được kiểm tra trong controller

module.exports = router;