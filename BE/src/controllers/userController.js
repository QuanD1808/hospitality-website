// BE/src/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để lấy JWT_SECRET và JWT_EXPIRE

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Đăng ký User mới
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
    console.log('--- registerUser controller function called ---');
    const { userId, username, email, password, fullName, phone, role } = req.body;
    try {
        let user = await User.findOne({ $or: [{ userId }, { username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User with that ID, username or email already exists' });
        }
        user = new User({ userId, username, email, password, fullName, phone, role });
        const savedUser = await user.save(); // Mật khẩu sẽ được hash ở đây
        
        const userResponse = savedUser.toObject();
        delete userResponse.password; // Không trả về password hash

        res.status(201).json({ ...userResponse, token: generateToken(savedUser._id) });
    } catch (err) {
        if (err.code === 11000) { // Lỗi trùng lặp unique key
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} '${err.keyValue[field]}' already exists.` });
        }
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Đăng nhập User
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
    console.log('--- Login request received ---');
    console.log('Request body for login:', req.body);
    const { email, password } = req.body;

    try {
        // 1. Kiểm tra dữ liệu đầu vào có đầy đủ không
        if (!email || !password) {
            console.log('Login attempt failed: Email or password was not provided.');
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
        }
        
        console.log(`Login attempt for email: ${email}`);
        
        // 2. Tìm người dùng bằng email và lấy cả trường password đã bị ẩn
        const user = await User.findOne({ email }).select('+password');

        // 3. So sánh mật khẩu và kiểm tra người dùng tồn tại
        // Gộp cả hai trường hợp (không tìm thấy user hoặc sai mật khẩu) vào một
        // để tăng cường bảo mật, tránh việc kẻ xấu dò xem email có tồn tại không.
        if (!user || !(await user.matchPassword(password))) {
            console.log(`Login attempt failed for email: ${email}. Invalid credentials.`);
            return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' }); 
        }

        console.log(`Login successful for user: ${user.email} (ID: ${user._id}, Role: ${user.role})`);
        
        // 4. Tạo token và chuẩn bị dữ liệu trả về
        const userResponse = user.toObject();
        delete userResponse.password; // Không bao giờ trả về mật khẩu đã hash

        // 5. Trả về thông tin người dùng và token
        res.status(200).json({
            ...userResponse,
            token: generateToken(user._id)
        });
        
    } catch (err) {
        console.error('An unexpected error occurred during login:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.' });
    }
};

// @desc    Lấy User hiện tại (dựa trên token)
// @route   GET /api/users/me
// @access  Protected
exports.getMe = async (req, res) => {
    console.log('--- getMe controller function called ---');
    // req.user được gán bởi middleware 'protect'
    // Middleware 'protect' đã select('-password') nên không cần làm lại ở đây
    res.status(200).json(req.user);
};

// @desc    Lấy tất cả Users
// @route   GET /api/users
// @access  Protected (ADMIN)
exports.getAllUsers = async (req, res) => {
    console.log('--- getAllUsers controller function called ---');
    try {
        const users = await User.find(); // Password không trả về do select: false trong Schema
        res.status(200).json(users);
    } catch (err) {
        console.error('Error in getAllUsers:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy một User theo _id
// @route   GET /api/users/:id
// @access  Protected
exports.getUserById = async (req, res) => {
    console.log('--- getUserById controller function called with id:', req.params.id);
    try {
        const user = await User.findById(req.params.id); // Password không trả về do select: false
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Logic phân quyền:
        // PATIENT chỉ được xem profile của chính mình.
        // Các vai trò khác (DOCTOR, PHARMACIST, RECEPTIONIST, ADMIN) có thể xem của người khác.
        if (req.user.role === 'PATIENT' && req.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this user profile' });
        }
        
        res.status(200).json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        console.error('Error in getUserById:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Lấy một User theo userId (ID tùy chỉnh)
// @route   GET /api/users/custom/:userId
// @access  Protected
exports.getUserByCustomId = async (req, res) => {
    console.log('--- getUserByCustomId controller function called with userId:', req.params.userId);
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User with that custom ID not found' });
        }
        // Logic phân quyền tương tự như getUserById
        if (req.user.role === 'PATIENT' && req.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this user profile' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error in getUserByCustomId:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// BE/src/controllers/userController.js

// @desc    Cập nhật một User theo _id
// @route   PUT /api/users/:id
// @access  Protected
exports.updateUser = async (req, res) => {
    console.log('--- updateUser controller function called for id:', req.params.id, 'with data:', req.body);
    
    // Loại bỏ isReceptionist, chúng ta không cần nó nữa
    const { password, role, ...otherUpdates } = req.body; 

    try {
        let userToUpdate = await User.findById(req.params.id);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        const requester = req.user;
        const targetUser = userToUpdate;

        // === LOGIC PHÂN QUYỀN ĐƯỢC VIẾT LẠI HOÀN TOÀN ===
        const isSelfUpdate = requester._id.toString() === targetUser._id.toString();
        const isPrivilegedRole = ['ADMIN', 'RECEPTIONIST'].includes(requester.role);
        const isDoctorUpdatingPatient = (requester.role === 'DOCTOR' && targetUser.role === 'PATIENT');

        // Kiểm tra quyền cập nhật chung
        if (!isPrivilegedRole && !isSelfUpdate && !isDoctorUpdatingPatient) {
            return res.status(403).json({ message: 'Bạn không có quyền cập nhật thông tin người dùng này.' });
        }
        
        // --- Các quy tắc chi tiết hơn ---

        // 1. Chỉ các vai trò đặc quyền (ADMIN, RECEPTIONIST) mới được thay đổi vai trò (role)
        if (role && role !== targetUser.role && !isPrivilegedRole) {
            return res.status(403).json({ message: 'Chỉ Quản trị viên hoặc Lễ tân mới có thể thay đổi vai trò.' });
        }
        if (role && isPrivilegedRole) {
            targetUser.role = role;
        }

        // 2. Cập nhật các trường thông tin khác
        Object.keys(otherUpdates).forEach(key => {
            targetUser[key] = otherUpdates[key];
        });

        // 3. Cập nhật mật khẩu nếu có
        if (password) {
            targetUser.password = password; // pre('save') hook sẽ tự động hash lại
        }

        // Lưu các thay đổi vào database
        const updatedUser = await targetUser.save();
        
        // Trả về kết quả, không bao gồm mật khẩu
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json(userResponse);

    } catch (err) {
        if (err.code === 11000) { // Lỗi trùng key
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} đã tồn tại.` });
        }
        if (err.name === 'CastError') { // Lỗi định dạng ID
             return res.status(400).json({ message: 'Định dạng ID người dùng không hợp lệ.' });
        }
        console.error('Error in updateUser:', err);
        res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật người dùng.', error: err.message });
    }
};

// @desc    Xóa một User theo _id
// @route   DELETE /api/users/:id
// @access  Protected (ADMIN và RECEPTIONIST đối với PATIENT)
exports.deleteUser = async (req, res) => {
    console.log('--- deleteUser controller function called for id:', req.params.id);
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra nếu là tiếp tân và có tham số isReceptionist=true và người dùng là PATIENT
        if (req.user.role === 'RECEPTIONIST' && req.query.isReceptionist === 'true' && user.role === 'PATIENT') {
            console.log('Receptionist deleting patient with special permission');
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'User deleted successfully by receptionist' });
        }

        // Nếu không phải trường hợp đặc biệt, phải là ADMIN
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized to delete users' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid User ID format' });
        }
        console.error('Error in deleteUser:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Kiểm tra tính hợp lệ của token
// @route   GET /api/users/validate-token
// @access  Protected
exports.validateToken = async (req, res) => {
    console.log('--- validateToken controller function called ---');
    // Nếu middleware 'protect' đã xác thực token thành công, chỉ cần trả về thành công
    res.status(200).json({ valid: true, user: req.user._id });
};

// @desc    Lấy tất cả bệnh nhân (Users với role='PATIENT')
// @route   GET /api/users/patients
// @access  Protected (ADMIN, DOCTOR, PHARMACIST, RECEPTIONIST)
exports.getAllPatients = async (req, res) => {
    console.log('--- getAllPatients controller function called ---');
    try {
        // Chỉ lấy người dùng có role là PATIENT
        const patients = await User.find({ role: 'PATIENT' });
        res.status(200).json(patients);
    } catch (err) {
        console.error('Error getting all patients:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// BE/src/controllers/userController.js

// @desc    Tạo User mới (bởi nhân viên hoặc admin)
// @route   POST /api/users
// @access  Protected (ADMIN, RECEPTIONIST)
exports.createUser = async (req, res) => {
    console.log('--- createUser controller function called ---');
    console.log('Request body:', req.body);
    
    const { userId, username, email, password, fullName, phone, role } = req.body;
    
    // === BƯỚC 1: VALIDATION DỮ LIỆU ĐẦU VÀO ===
    if (!fullName || !email || !password || !role) {
        return res.status(400).json({ 
            message: 'Vui lòng cung cấp đầy đủ các trường bắt buộc: fullName, email, password, role.' 
        });
    }

    // Kiểm tra quyền hạn của người tạo
    const creatorRole = req.user.role;
    const privilegedRoles = ['ADMIN', 'RECEPTIONIST'];

    if (!privilegedRoles.includes(creatorRole) && role !== 'PATIENT') {
        console.log(`User with role '${creatorRole}' attempted to create a '${role}' user - Permission denied`);
        return res.status(403).json({ 
            message: `Bạn không có quyền tạo người dùng với vai trò '${role}'.` 
        });
    }
    
    try {
        // Kiểm tra xem user đã tồn tại chưa (chỉ cần kiểm tra các trường unique)
        // Bỏ qua userId nếu nó là null hoặc undefined
        const orConditions = [{ email }];
        if (username) orConditions.push({ username });
        if (userId) orConditions.push({ userId });

        let existingUser = await User.findOne({ $or: orConditions });
        
        if (existingUser) {
            let duplicateField = 'thông tin';
            if (existingUser.email === email) duplicateField = 'Email';
            else if (username && existingUser.username === username) duplicateField = 'Username';
            else if (userId && existingUser.userId === userId) duplicateField = 'User ID';
            
            return res.status(400).json({ 
                message: `${duplicateField} đã tồn tại. Vui lòng sử dụng thông tin khác.`,
                field: duplicateField.toLowerCase().replace(' ', '')
            });
        }
        
        // Tạo user mới
        const newUser = new User({
            userId: userId || `${role.substring(0, 2).toUpperCase()}${Date.now()}`,
            username,
            email,
            password, // Sẽ được hash trong model
            fullName,
            phone,
            role,
        });
        
        // Lưu user vào database
        const savedUser = await newUser.save();
        
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        
        console.log(`Successfully created new ${role} with ID: ${userResponse.userId}`);
        res.status(201).json(userResponse);

    } catch (err) {
        console.error('Error creating user:', err);
        
        // === BƯỚC 2: CẢI THIỆN XỬ LÝ LỖI ===
        // Xử lý lỗi validation từ Mongoose
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join('. ') });
        }

        // Xử lý lỗi trùng lặp unique key (dự phòng)
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ 
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} đã tồn tại.`,
                field: field
            });
        }
        
        res.status(500).json({ message: 'Lỗi máy chủ khi tạo người dùng.', error: err.message });
    }
};

// @desc    Lấy tất cả bác sĩ (Users với role='DOCTOR')
// @route   GET /api/users/doctors
// @access  Protected (ADMIN, DOCTOR, PHARMACIST, RECEPTIONIST)
exports.getAllDoctors = async (req, res) => {
    console.log('--- getAllDoctors controller function called ---');
    try {
        // Chỉ lấy người dùng có role là DOCTOR
        const doctors = await User.find({ role: 'DOCTOR' });
        res.status(200).json(doctors);
    } catch (err) {
        console.error('Error getting all doctors:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};