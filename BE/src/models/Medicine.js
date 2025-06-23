// src/models/Medicine.js
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    customMedicineId: { // Tương ứng với 'Id' trong sơ đồ
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    totalPills: { // <-- THÊM TRƯỜNG 'totalPills'
        type: Number, // INT trong sơ đồ
        required: true,
        default: 0,
        min: 0
    },
    price: { // <-- THÊM TRƯỜNG 'price'
        type: Number, // DECIMAL(10,2) trong sơ đồ, dùng Number trong Mongoose
        required: true,
        min: 0
    }
}, {
    timestamps: true // Giữ lại createdAt, updatedAt
});

module.exports = mongoose.model('Medicine', MedicineSchema);