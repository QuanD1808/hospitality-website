// BE/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', protect, userController.getMe);

router.get('/', protect, authorizeRoles('ADMIN'), userController.getAllUsers);
router.get('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'PATIENT'), userController.getUserById); // Cho phép nhiều role xem
router.get('/custom/:userId', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'PATIENT'), userController.getUserByCustomId);
router.put('/:id', protect, authorizeRoles('ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'PATIENT'), userController.updateUser); // Cho phép nhiều role cập nhật (với logic phân quyền trong controller)
router.delete('/:id', protect, authorizeRoles('ADMIN'), userController.deleteUser);

module.exports = router;