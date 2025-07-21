// Mock data for the pharmacy system
export const patients = [{
  id: 1,
  serialNumber: "PT001",
  fullName: "Nguyễn Văn An",
  age: 45,
  gender: "Nam",
  phone: "0901234567",
  address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  medicalHistory: "Tiểu đường tuýp 2, tăng huyết áp",
  diagnosis: "Viêm phổi",
  doctor: "Bs. Trần Thị Hoa",
  prescription: [{
    name: "Augmentin 625mg",
    quantity: 20,
    dosage: "1 sáng, 1 trưa, 1 tối",
    price: 15000
  }, {
    name: "Paracetamol 500mg",
    quantity: 10,
    dosage: "1 viên khi sốt trên 38.5°C",
    price: 3000
  }, {
    name: "Bromhexine 8mg",
    quantity: 30,
    dosage: "1 sáng, 1 trưa, 1 tối",
    price: 2000
  }]
}, {
  id: 2,
  serialNumber: "PT002",
  fullName: "Trần Thị Bình",
  age: 32,
  gender: "Nữ",
  phone: "0912345678",
  address: "45 Lê Lợi, Quận 5, TP.HCM",
  medicalHistory: "Dị ứng với Penicillin",
  diagnosis: "Viêm xoang",
  doctor: "Bs. Lê Văn Minh",
  prescription: [{
    name: "Telfast 180mg",
    quantity: 10,
    dosage: "1 viên/ngày",
    price: 12000
  }, {
    name: "Natri Clorua 0.9%",
    quantity: 2,
    dosage: "Nhỏ mũi 3 lần/ngày",
    price: 25000
  }, {
    name: "Vitamin C 500mg",
    quantity: 30,
    dosage: "1 viên/ngày",
    price: 1500
  }]
}, {
  id: 3,
  serialNumber: "PT003",
  fullName: "Lê Hoàng Cường",
  age: 28,
  gender: "Nam",
  phone: "0978123456",
  address: "78 Võ Thị Sáu, Quận 3, TP.HCM",
  medicalHistory: "Khỏe mạnh",
  diagnosis: "Đau dạ dày cấp tính",
  doctor: "Bs. Nguyễn Thị Lan",
  prescription: [{
    name: "Omeprazole 20mg",
    quantity: 30,
    dosage: "1 viên trước ăn sáng",
    price: 3000
  }, {
    name: "Maalox",
    quantity: 1,
    dosage: "10ml sau mỗi bữa ăn",
    price: 65000
  }, {
    name: "Librax",
    quantity: 30,
    dosage: "1 viên sau ăn sáng, trưa, tối",
    price: 5000
  }]
}, {
  id: 4,
  serialNumber: "PT004",
  fullName: "Phạm Thị Diễm",
  age: 52,
  gender: "Nữ",
  phone: "0936789012",
  address: "234 Cách Mạng Tháng 8, Quận 10, TP.HCM",
  medicalHistory: "Tăng huyết áp, cholesterol cao",
  diagnosis: "Đau thắt ngực",
  doctor: "Bs. Hoàng Văn Phúc",
  prescription: [{
    name: "Aspirin 81mg",
    quantity: 30,
    dosage: "1 viên/ngày",
    price: 2000
  }, {
    name: "Atorvastatin 10mg",
    quantity: 30,
    dosage: "1 viên trước khi ngủ",
    price: 5000
  }, {
    name: "Isosorbide Dinitrate 5mg",
    quantity: 30,
    dosage: "1 viên khi có cơn đau ngực",
    price: 4000
  }]
}, {
  id: 5,
  serialNumber: "PT005",
  fullName: "Võ Minh Em",
  age: 7,
  gender: "Nam",
  phone: "0945678901",
  address: "56 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
  medicalHistory: "Hen suyễn",
  diagnosis: "Cảm cúm",
  doctor: "Bs. Lý Thị Hương",
  prescription: [{
    name: "Paracetamol syrup",
    quantity: 1,
    dosage: "5ml mỗi 6 tiếng khi sốt",
    price: 35000
  }, {
    name: "Vitamin C 100mg",
    quantity: 20,
    dosage: "1 viên/ngày",
    price: 1000
  }, {
    name: "Nước muối sinh lý",
    quantity: 5,
    dosage: "Nhỏ mũi 3 lần/ngày",
    price: 10000
  }]
}];
export const invoices = [{
  id: 101,
  patientId: 1,
  date: "2023-06-15",
  totalAmount: 320000,
  pharmacistName: "Nguyễn Thị Hà"
}, {
  id: 102,
  patientId: 3,
  date: "2023-06-15",
  totalAmount: 245000,
  pharmacistName: "Nguyễn Thị Hà"
}, {
  id: 103,
  patientId: 2,
  date: "2023-06-14",
  totalAmount: 395000,
  pharmacistName: "Trần Văn Bình"
}, {
  id: 104,
  patientId: 4,
  date: "2023-06-13",
  totalAmount: 330000,
  pharmacistName: "Nguyễn Thị Hà"
}];
export const dailyRevenue = [{
  date: "2023-06-15",
  amount: 565000
}, {
  date: "2023-06-14",
  amount: 395000
}, {
  date: "2023-06-13",
  amount: 330000
}, {
  date: "2023-06-12",
  amount: 420000
}, {
  date: "2023-06-11",
  amount: 280000
}];