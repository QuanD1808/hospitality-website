// src/models/Prescription.js
const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    customPrescriptionId: { // Tương ứng với 'Id' trong sơ đồ
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    patientId: { // <-- THÊM TRƯỜNG 'patientId' (FK đến User)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Đây là ID của User có role 'PATIENT'
        required: true
    },
    doctorId: { // <-- THÊM TRƯỜNG 'doctorId' (FK đến User)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Đây là ID của User có role 'DOCTOR'
        required: true
    },
    diagnosis: { // <-- THÊM TRƯỜNG 'diagnosis' (String, tương ứng 'diagn...' VARCHAR)
        type: String,
        required: true,
        trim: true
    },
    date: { // <-- THÊM TRƯỜNG 'date'
        type: Date,
        default: Date.now,
        required: true
    },
    status: { // <-- THÊM TRƯỜNG 'status'
        type: String, // INT trong sơ đồ, nhưng String enum tiện hơn cho trạng thái
        enum: ['PENDING_DISPENSE', 'DISPENSED', 'CANCELLED'], // Ví dụ các trạng thái
        default: 'PENDING_DISPENSE',
        required: true
    }
}, {
    timestamps: true // Giữ lại createdAt, updatedAt
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);