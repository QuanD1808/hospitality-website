export const patients = [{
  id: 1,
  fullName: "Nguyễn Văn An",
  nationalId: "079202000001",
  age: 45,
  gender: "Nam",
  phone: "0901234567",
  address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  createdAt: "2023-06-15",
  queueNumber: null,
  status: "đã khám" // "chờ khám", "đã khám", "chờ thuốc"
}, {
  id: 2,
  fullName: "Trần Thị Bình",
  nationalId: "079202000002",
  age: 32,
  gender: "Nữ",
  phone: "0912345678",
  address: "45 Lê Lợi, Quận 5, TP.HCM",
  createdAt: "2023-06-15",
  queueNumber: "A002",
  status: "chờ khám"
}, {
  id: 3,
  fullName: "Lê Hoàng Cường",
  nationalId: "079202000003",
  age: 28,
  gender: "Nam",
  phone: "0978123456",
  address: "78 Võ Thị Sáu, Quận 3, TP.HCM",
  createdAt: "2023-06-15",
  queueNumber: null,
  status: "chờ thuốc"
}];
export const examinationHistory = [{
  id: 1,
  patientId: 1,
  date: "2023-06-15",
  doctor: "Bs. Trần Thị Hoa",
  diagnosis: "Viêm phổi",
  prescription: ["Augmentin 625mg", "Paracetamol 500mg", "Bromhexine 8mg"]
}, {
  id: 2,
  patientId: 3,
  date: "2023-06-15",
  doctor: "Bs. Nguyễn Thị Lan",
  diagnosis: "Đau dạ dày cấp tính",
  prescription: ["Omeprazole 20mg", "Maalox", "Librax"]
}];
export const waitingQueue = [{
  id: 1,
  patientId: 2,
  queueNumber: "A002",
  arrivalTime: "08:30",
  status: "chờ khám"
}];