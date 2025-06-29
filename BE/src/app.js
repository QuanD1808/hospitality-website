const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const prescriptionRoutes = require('./routes/prescriptionRoutes');
const prescriptionDetailRoutes = require('./routes/prescriptionDetailRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const queueRoutes = require('./routes/queueRoutes');

require('dotenv').config();

const app = express();

// Thêm cấu hình CORS
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Đổi lại nếu FE chạy port khác
  credentials: true
}));

// Kết nối đến Database
connectDB();

// Middleware: Cho phép Express đọc JSON từ request body
app.use(express.json());

// Định nghĩa Routes
app.use('/api/users', userRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/prescriptiondetails', prescriptionDetailRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/queues', queueRoutes);

// Error Handling Middleware (giữ nguyên)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});