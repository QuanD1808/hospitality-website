// src/models/PrescriptionDetail.js
const mongoose = require('mongoose');

const PrescriptionDetailSchema = new mongoose.Schema({
    customPrescriptionDetailId: { // Giữ custom ID để dễ quản lý, không có trong sơ đồ
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    prescriptionId: { // FK đến Prescription
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        required: true
    },
    medicineId: { // FK đến Medicine
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity: { // <-- THÊM TRƯỜNG 'quantity'
        type: Number, // INT trong sơ đồ
        required: true,
        min: 1
    },
    dosage: { // VARCHAR(100) trong sơ đồ
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Giữ lại createdAt, updatedAt
});

module.exports = mongoose.model('PrescriptionDetail', PrescriptionDetailSchema);