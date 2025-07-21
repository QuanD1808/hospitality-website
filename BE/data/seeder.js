// BE/data/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Không cần import bcryptjs ở đây vì User model đã tự xử lý

// Import CHỈ CÁC MODEL CÓ TRONG ERD MỚI
const User = require('../src/models/User');
const Medicine = require('../src/models/Medicine');
const Prescription = require('../src/models/Prescription');
const PrescriptionDetail = require('../src/models/PrescriptionDetail');

console.log('Seeder script started.');

dotenv.config({ path: './.env' }); // Đảm bảo dotenv load từ file .env ở thư mục gốc

console.log('Environment variables loaded. MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'NOT LOADED');

// Kết nối Database
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding!');
    } catch (err) {
        console.error('MongoDB connection error for Seeding:', err.message);
        throw err; // Ném lỗi để hàm gọi chính có thể bắt và đóng kết nối
    }
};

// Dữ liệu mẫu (Sample Data)
const usersData = [
  { userId: "u1", username: "nguyen.an", password: "password123", fullName: "Nguyễn Văn An", email: "an.nguyen@mediclinic.com", phone: "0901234567", role: "PATIENT" },
  { userId: "u2", username: "tran.hoa", password: "password123", fullName: "Trần Thị Hoa", email: "hoa.tran@mediclinic.com", phone: "0912345678", role: "DOCTOR" },
  { userId: "u3", username: "ta.tuan", password: "password123", fullName: "Tạ Văn Tuấn", email: "tuan.ta@mediclinic.com", phone: "0912786678", role: "RECEPTIONIST" },
  { userId: "u4", username: "anh.hai", password: "password123", fullName: "Nguyễn Hải Anh", email: "anh.hai@mediclinic.com", phone: "0112345678", role: "PHARMACIST" },
  { userId: "admin001", username: "admin", email: "admin@clinic.com", password: "adminpassword", fullName: "Admin System", phone: "0000000000", role: "ADMIN" }
];

const medicinesData = [
    { customMedicineId: "m1", name: "Paracetamol 500mg", totalPills: 1000, price: 0.50 },
    { customMedicineId: "m2", name: "Amoxicillin 250mg", totalPills: 500, price: 1.25 }
];

// Hàm Import Dữ liệu
const importData = async () => {
    // Xóa dữ liệu cũ
    await User.deleteMany({});
    await Medicine.deleteMany({});
    await Prescription.deleteMany({});
    await PrescriptionDetail.deleteMany({});
    console.log('Old data from relevant collections destroyed!');

    // 1. Thêm Users một cách tuần tự để đảm bảo pre-save hook được kích hoạt
    console.log('Attempting to seed users one by one to ensure hashing...');
    const createdUsers = [];
    for (const userData of usersData) {
        // User.create() sẽ kích hoạt middleware pre('save')
        const createdUser = await User.create(userData);
        createdUsers.push(createdUser);
        console.log(`User ${createdUser.username} seeded. Password should be hashed.`);
    }
    const patientUser = createdUsers.find(user => user.role === 'PATIENT' && user.username === 'nguyen.an');
    const doctorUser = createdUsers.find(user => user.role === 'DOCTOR' && user.username === 'tran.hoa');
    console.log('Users seeded!');

    // 2. Thêm Medicines
    console.log('Attempting to seed medicines...');
    const createdMedicines = await Medicine.insertMany(medicinesData);
    const paracetamol = createdMedicines.find(m => m.customMedicineId === 'm1');
    const amoxicillin = createdMedicines.find(m => m.customMedicineId === 'm2');
    console.log('Medicines seeded!');

    // 3. Thêm Prescriptions (Chỉ khi có patientUser, doctorUser)
    if (patientUser && doctorUser) {
        console.log('Attempting to seed prescriptions...');
        const prescriptionsData = [
            {
                customPrescriptionId: "pr1",
                patientId: patientUser._id,
                doctorId: doctorUser._id,
                diagnosis: "Common Cold",
                date: new Date("2024-06-01T10:00:00Z"),
                status: "PENDING_DISPENSE"
            },
            {
                customPrescriptionId: "pr2",
                patientId: patientUser._id, // Có thể dùng một patient khác nếu bạn seed nhiều patient
                doctorId: doctorUser._id,
                diagnosis: "Headache, suspected migraine",
                date: new Date("2024-06-02T14:30:00Z"),
                status: "DISPENSED"
            }
        ];
        const createdPrescriptions = await Prescription.insertMany(prescriptionsData);
        const pr1 = createdPrescriptions.find(p => p.customPrescriptionId === 'pr1');
        const pr2 = createdPrescriptions.find(p => p.customPrescriptionId === 'pr2');
        console.log('Prescriptions seeded!');

        // 4. Thêm PrescriptionDetails (Chỉ khi có pr1, pr2 và thuốc)
        if (pr1 && paracetamol && amoxicillin) {
            console.log('Attempting to seed prescription details for pr1...');
            const prescriptionDetailsDataPr1 = [
                {
                    customPrescriptionDetailId: "pd1",
                    prescriptionId: pr1._id,
                    medicineId: paracetamol._id,
                    quantity: 10,
                    dosage: "1 tablet every 6 hours"
                },
                {
                    customPrescriptionDetailId: "pd2",
                    prescriptionId: pr1._id,
                    medicineId: amoxicillin._id,
                    quantity: 14,
                    dosage: "1 capsule every 8 hours for 7 days"
                }
            ];
            await PrescriptionDetail.insertMany(prescriptionDetailsDataPr1);
            console.log('Prescription Details for pr1 seeded!');
        }
        if (pr2 && paracetamol) {
             console.log('Attempting to seed prescription details for pr2...');
            const prescriptionDetailsDataPr2 = [
                {
                    customPrescriptionDetailId: "pd3",
                    prescriptionId: pr2._id,
                    medicineId: paracetamol._id,
                    quantity: 5,
                    dosage: "1-2 tablets as needed for pain, max 4 per day"
                }
            ];
            await PrescriptionDetail.insertMany(prescriptionDetailsDataPr2);
            console.log('Prescription Details for pr2 seeded!');
        }

    } else {
        console.warn('Could not seed prescriptions/details because required patient or doctor user was not found in seeded data.');
    }
    console.log('Data import process finished.');
};

// Hàm Xóa Dữ liệu
const destroyData = async () => {
    console.log('Attempting to destroy all relevant data...');
    await User.deleteMany({});
    await Medicine.deleteMany({});
    await Prescription.deleteMany({});
    await PrescriptionDetail.deleteMany({});
    console.log('All relevant data destroyed successfully!');
};

// Hàm Chạy Chính
const runSeeder = async () => {
    let errorOccurred = false;
    try {
        await connectDB(); // Kết nối một lần ở đây
        if (process.argv[2] === '-d') {
            await destroyData();
        } else {
            await importData();
        }
        console.log('Seeder task completed successfully.');
    } catch (error) {
        console.error('Seeder task failed:', error);
        errorOccurred = true; // Đánh dấu có lỗi xảy ra
    } finally {
        // Đảm bảo đóng kết nối dù thành công hay thất bại
        if (mongoose.connection.readyState === 1) { // 1 = open
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
        }
        // Thoát script với mã phù hợp
        process.exit(errorOccurred ? 1 : 0); // Nếu có lỗi thì exit(1), không thì exit(0)
    }
};

runSeeder();