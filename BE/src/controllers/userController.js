// BE/src/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để lấy JWT_SECRET và JWT_EXPIRE

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
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
        if (!email || !password) {
            console.log('Login: Email or password missing');
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        console.log(`Login: Finding user with email: ${email}`);
        const user = await User.findOne({ email }).select('+password'); // Lấy cả password để so sánh

        if (!user) {
            console.log('Login: User not found for email:', email);
            return res.status(400).json({ message: 'Invalid Credentials (User not found)' });
        }
        console.log('Login: User found, comparing password...');
        const isMatch = await user.matchPassword(password);
        console.log('Login: Password match result:', isMatch);

        if (!isMatch) {
            console.log('Login: Password incorrect for email:', email);
            return res.status(400).json({ message: 'Invalid Credentials (Password incorrect)' });
        }

        console.log('Login: Password matched, generating token...');
        const userResponse = user.toObject();
        delete userResponse.password; // Không trả về password hash

        res.status(200).json({
            ...userResponse,
            token: generateToken(user._id)
        });
        console.log('Login: Response sent successfully for email:', email);
    } catch (err) {
        console.error('Login error in controller:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
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

// @desc    Cập nhật một User theo _id
// @route   PUT /api/users/:id
// @access  Protected
exports.updateUser = async (req, res) => {
    console.log('--- updateUser controller function called for id:', req.params.id, 'with data:', req.body);
    const { password, role, ...otherUpdates } = req.body; // Tách password và role ra
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Phân quyền cập nhật:
        // User chỉ có thể tự cập nhật thông tin của mình (trừ vai trò)
        // ADMIN có thể cập nhật mọi thứ của người khác, bao gồm cả vai trò
        if (req.user.role !== 'ADMIN' && req.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this user profile' });
        }
        // Nếu người dùng đang tự cập nhật, không cho phép họ tự đổi vai trò của mình
        if (req.user._id.toString() === user._id.toString() && role && role !== user.role) {
             return res.status(403).json({ message: 'Users cannot change their own role.' });
        }
        // Chỉ ADMIN mới có thể thay đổi vai trò của người khác
        if (role && req.user.role !== 'ADMIN' && req.user._id.toString() !== user._id.toString()) {
             return res.status(403).json({ message: 'Only ADMIN can change other users roles.' });
        }
        if (role && req.user.role === 'ADMIN') { // Nếu admin gửi role, cập nhật nó
            user.role = role;
        }


        // Cập nhật các trường khác
        Object.keys(otherUpdates).forEach(key => {
            // Không cho phép cập nhật userId, username, email nếu người dùng không phải admin
            const restrictedFields = ['userId', 'username', 'email'];
            if (restrictedFields.includes(key) && req.user.role !== 'ADMIN' && req.user._id.toString() !== user._id.toString()){
                return; // Bỏ qua, không cập nhật
            }
            // User tự cập nhật cũng không nên đổi userId, username (chỉ admin mới có thể làm việc này một cách cẩn thận)
            if (restrictedFields.includes(key) && key !== 'email' && req.user._id.toString() === user._id.toString() && user[key] !== otherUpdates[key]) {
                 console.warn(`User ${user.email} attempting to change restricted field ${key}. Denied unless ADMIN.`);
                 return; // Admin có thể đổi, người khác không nên
            }
            user[key] = otherUpdates[key];
        });

        if (password) {
            user.password = password; // pre('save') hook sẽ hash lại
        }

        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password; // Không trả về password

        res.status(200).json(userResponse);
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} '${err.keyValue[field]}' already exists.` });
        }
        if (err.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid User ID format' });
        }
        console.error('Error in updateUser:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Xóa một User theo _id
// @route   DELETE /api/users/:id
// @access  Protected (ADMIN)
exports.deleteUser = async (req, res) => {
    console.log('--- deleteUser controller function called for id:', req.params.id);
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Trong trường hợp này, route đã được bảo vệ bởi authorizeRoles('ADMIN'),
        // nên chỉ admin mới vào được đây. Nếu muốn thêm kiểm tra ở đây cũng được.

        await User.findByIdAndDelete(req.params.id); // Đã sửa lại, dùng findByIdAndDelete

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid User ID format' });
        }
        console.error('Error in deleteUser:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};