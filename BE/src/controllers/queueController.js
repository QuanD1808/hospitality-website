// BE/src/controllers/queueController.js
const Queue = require('../models/Queue');
const User = require('../models/User');

// @desc    Lấy tất cả các queue
// @route   GET /api/queues
// @access  Protected
exports.getAllQueues = async (req, res) => {
    try {
        const queues = await Queue.find().sort({ createdAt: 1 });
        res.status(200).json(queues);
    } catch (err) {
        console.error('Error fetching queues:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy tất cả các queue kèm thông tin bệnh nhân
// @route   GET /api/queues/with-patients
// @access  Protected
exports.getAllQueuesWithPatients = async (req, res) => {
    try {
        // Sử dụng populate để lấy thông tin bệnh nhân từ reference
        const queues = await Queue.find()
            .populate('patient', 'userId fullName phone role email')
            .populate('doctorId', 'fullName userId')
            .sort({ createdAt: 1 });
        
        res.status(200).json(queues);
    } catch (err) {
        console.error('Error fetching queues with patients:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy các queue được chỉ định cho bác sĩ cụ thể
// @route   GET /api/queues/doctor
// @access  Protected (DOCTOR)
exports.getQueuesByDoctor = async (req, res) => {
    try {
        // Nếu là bác sĩ, chỉ trả về queue được chỉ định cho bác sĩ đó
        if (req.user.role === 'DOCTOR') {
            const doctorId = req.user._id;
            
            // Lọc queue theo doctorId và có thể theo status nếu được chỉ định trong query
            const filter = { doctorId };
            if (req.query.status) {
                filter.status = req.query.status;
            }
            
            const queues = await Queue.find(filter)
                .populate('patient', 'userId fullName phone role email')
                .populate('doctorId', 'fullName userId')
                .sort({ createdAt: 1 });
            
            console.log(`Found ${queues.length} queues for doctor ${doctorId}`);
            return res.status(200).json(queues);
        }
        
        // Nếu là admin hoặc vai trò khác được phép, có thể lọc theo doctorId từ query
        if (req.query.doctorId) {
            const queues = await Queue.find({ doctorId: req.query.doctorId })
                .populate('patient', 'userId fullName phone role email')
                .populate('doctorId', 'fullName userId')
                .sort({ createdAt: 1 });
            
            return res.status(200).json(queues);
        }
        
        // Nếu không có doctorId trong query, trả về lỗi
        return res.status(400).json({ message: 'doctorId is required for non-doctor users' });
    } catch (err) {
        console.error('Error fetching queues for doctor:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy queue theo ID
// @route   GET /api/queues/:id
// @access  Protected
exports.getQueueById = async (req, res) => {
    try {
        const queue = await Queue.findById(req.params.id)
            .populate('patient', 'userId fullName phone role email')
            .populate('doctorId', 'fullName userId');
        
        if (!queue) {
            return res.status(404).json({ message: 'Queue not found' });
        }
        
        res.status(200).json(queue);
    } catch (err) {
        console.error('Error fetching queue:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy queues theo trạng thái
// @route   GET /api/queues/status/:status
// @access  Protected
exports.getQueuesByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        
        // Validate status
        const validStatuses = ['waiting', 'in_progress', 'completed', 'canceled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        
        const queues = await Queue.find({ status })
            .populate('patient', 'userId fullName phone role email')
            .populate('doctorId', 'fullName userId')
            .sort({ createdAt: 1 });
        
        res.status(200).json(queues);
    } catch (err) {
        console.error(`Error fetching queues with status ${req.params.status}:`, err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Tạo queue mới
// @route   POST /api/queues
// @access  Protected
exports.createQueue = async (req, res) => {
    try {
        const { patientId, status = 'waiting', notes } = req.body;
        
        // Kiểm tra patientId có tồn tại không
        const patient = await User.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        
        // Kiểm tra xem bệnh nhân đã có trong hàng đợi chưa (trạng thái waiting hoặc in_progress)
        const existingQueue = await Queue.findOne({
            patient: patientId,
            status: { $in: ['waiting', 'in_progress'] }
        });
        
        if (existingQueue) {
            return res.status(400).json({
                message: 'Patient already in queue',
                existingQueue
            });
        }
        
        // Tạo queue mới
        const newQueue = new Queue({
            patient: patientId,
            status,
            notes
        });
        
        const savedQueue = await newQueue.save();
        
        // Trả về queue đã được lưu cùng thông tin bệnh nhân
        const populatedQueue = await Queue.findById(savedQueue._id)
            .populate('patient', 'userId fullName phone role email');
        
        res.status(201).json(populatedQueue);
    } catch (err) {
        console.error('Error creating queue:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Cập nhật trạng thái queue
// @route   PUT /api/queues/:id
// @access  Protected
exports.updateQueue = async (req, res) => {
    try {
        const { status, doctorId, notes } = req.body;
        const queueId = req.params.id;
        
        // Kiểm tra queue có tồn tại không
        let queue = await Queue.findById(queueId);
        if (!queue) {
            return res.status(404).json({ message: 'Queue not found' });
        }
        
        // Nếu có doctorId, kiểm tra bác sĩ có tồn tại không
        if (doctorId) {
            const doctor = await User.findById(doctorId);
            if (!doctor || doctor.role !== 'DOCTOR') {
                return res.status(404).json({ message: 'Doctor not found or user is not a doctor' });
            }
        }
        
        // Cập nhật trạng thái và thông tin khác
        queue.status = status || queue.status;
        if (doctorId) queue.doctorId = doctorId;
        if (notes !== undefined) queue.notes = notes;
        
        const updatedQueue = await queue.save();
        
        // Trả về queue đã được cập nhật cùng thông tin bệnh nhân và bác sĩ
        const populatedQueue = await Queue.findById(updatedQueue._id)
            .populate('patient', 'userId fullName phone role email')
            .populate('doctorId', 'fullName userId');
        
        res.status(200).json(populatedQueue);
    } catch (err) {
        console.error(`Error updating queue ${req.params.id}:`, err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Xóa queue
// @route   DELETE /api/queues/:id
// @access  Protected
exports.deleteQueue = async (req, res) => {
    try {
        const queue = await Queue.findById(req.params.id);
        
        if (!queue) {
            return res.status(404).json({ message: 'Queue not found' });
        }
        
        await queue.remove();
        res.status(200).json({ message: 'Queue removed' });
    } catch (err) {
        console.error(`Error deleting queue ${req.params.id}:`, err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Gửi thông tin queue cho bác sĩ khi hoàn thành đưa vào
// @route   PUT /api/queues/:id/send-to-doctor
// @access  Protected
exports.sendQueueToDoctor = async (req, res) => {
    try {
        const queueId = req.params.id;
        
        // Kiểm tra queue có tồn tại không
        let queue = await Queue.findById(queueId);
        if (!queue) {
            return res.status(404).json({ message: 'Queue not found' });
        }
        
        // Kiểm tra xem queue đã được gán cho bác sĩ chưa
        if (!queue.doctorId) {
            return res.status(400).json({ message: 'No doctor assigned to this queue' });
        }
        
        // Kiểm tra xem bác sĩ có tồn tại không
        const doctor = await User.findById(queue.doctorId);
        if (!doctor || doctor.role !== 'DOCTOR') {
            return res.status(400).json({ message: 'Assigned doctor not found or user is not a doctor' });
        }
        
        // Cập nhật trạng thái queue thành "in_progress" nếu chưa phải
        if (queue.status !== 'in_progress') {
            queue.status = 'in_progress';
            await queue.save();
        }
        
        // Trả về queue đã được cập nhật cùng thông tin bệnh nhân và bác sĩ
        const populatedQueue = await Queue.findById(queue._id)
            .populate('patient', 'userId fullName phone role email')
            .populate('doctorId', 'fullName userId');
        
        res.status(200).json({
            message: 'Queue sent to doctor successfully',
            queue: populatedQueue
        });
    } catch (err) {
        console.error(`Error sending queue ${req.params.id} to doctor:`, err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
