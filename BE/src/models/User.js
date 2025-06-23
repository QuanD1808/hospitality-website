// BE/src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false // Không trả về password khi find() thông thường
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'ADMIN', 'PATIENT'],
        default: 'PATIENT'
    }
}, {
    timestamps: true
});

// Middleware: Hash mật khẩu trước khi lưu
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Phương thức để so sánh mật khẩu
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Dòng export Model quan trọng
module.exports = mongoose.model('User', UserSchema);