// BE/src/routes/queueRoutes.js
const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Tất cả các routes đều yêu cầu xác thực
router.use(protect);

// Routes cho nhân viên y tế (RECEPTIONIST, DOCTOR, ADMIN, PHARMACIST)
router.get('/', authorizeRoles('ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST'), queueController.getAllQueues);
router.get('/with-patients', authorizeRoles('ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST'), queueController.getAllQueuesWithPatients);
router.get('/doctor', authorizeRoles('ADMIN', 'DOCTOR'), queueController.getQueuesByDoctor);
router.get('/status/:status', authorizeRoles('ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST'), queueController.getQueuesByStatus);
router.get('/:id', authorizeRoles('ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST'), queueController.getQueueById);
router.post('/', authorizeRoles('ADMIN', 'RECEPTIONIST'), queueController.createQueue);
router.put('/:id', authorizeRoles('ADMIN', 'DOCTOR', 'RECEPTIONIST'), queueController.updateQueue);
router.put('/:id/send-to-doctor', authorizeRoles('ADMIN', 'RECEPTIONIST'), queueController.sendQueueToDoctor);
router.delete('/:id', authorizeRoles('ADMIN', 'RECEPTIONIST'), queueController.deleteQueue);

module.exports = router;
