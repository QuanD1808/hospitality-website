import { 
  User, 
  Prescription, 
  PrescriptionDetail, 
  Medicine,
  mockUsers,
  mockPrescriptions,
  mockPrescriptionDetails,
  mockMedicines,
  mockInvoices,
  getPrescriptionsByStatus,
  getUserById,
  getPrescriptionDetailsByPrescriptionId,
  getMedicineById
} from '../datats/mockPatients';

// Type definitions to match the pharmacy page UI needs
export interface PharmacyPatient {
  id: string; // Prescription ID
  serialNumber: string;
  fullName: string;
  phone: string;
  diagnosis: string;
  doctor: string;
  prescription: PharmacyMedicine[];
}

export interface PharmacyMedicine {
  name: string;
  quantity: number;
  dosage: string;
  price: number;
}

export interface PharmacyInvoice {
  id: string;
  date: string;
  patientId: string;
  pharmacistName: string;
  totalAmount: number;
}

// Function to get patients with pending prescriptions for the pharmacy
export const getPatientsWithPendingPrescriptions = (): PharmacyPatient[] => {
  const pendingPrescriptions = getPrescriptionsByStatus('PENDING_DISPENSE');
  
  return pendingPrescriptions.map(prescription => {
    // Get patient details
    const patient = getUserById(prescription.patientId);
    // Get doctor details
    const doctor = getUserById(prescription.doctorId);
    // Get prescription details
    const prescriptionDetails = getPrescriptionDetailsByPrescriptionId(prescription._id);
    
    // Map prescription details to medicines
    const medicines = prescriptionDetails.map(detail => {
      const medicine = getMedicineById(detail.medicineId);
      return {
        name: medicine?.name || 'Unknown',
        quantity: detail.quantity,
        dosage: detail.dosage,
        price: medicine?.price || 0
      };
    });
    
    return {
      id: prescription._id,
      serialNumber: prescription.customPrescriptionId,
      fullName: patient?.fullName || 'Unknown',
      phone: patient?.phone || 'N/A',
      diagnosis: prescription.diagnosis,
      doctor: doctor?.fullName || 'Không xác định',
      prescription: medicines
    };
  });
};

// Function to get pharmacy invoice data
export const getPharmacyInvoices = (): PharmacyInvoice[] => {
  return mockInvoices.map(invoice => {
    // Get pharmacist information (default to a specific ID if needed)
    const pharmacist = getUserById('685face13fc4c04e1bd96c0a'); // Default pharmacist ID
    
    // Return formatted invoice data
    return {
      id: invoice._id,
      date: invoice.createdAt, // Use createdAt as the invoice date
      patientId: invoice.patientId,
      pharmacistName: pharmacist?.fullName || 'Nhân viên phát thuốc',
      totalAmount: invoice.totalAmount
    };
  });
};

// Function to get daily revenue data for statistics
export const getDailyRevenue = () => {
  const today = new Date();
  const result = [];
  
  // Create revenue data for the last 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Sum all invoices for this date
    const dateInvoices = mockInvoices.filter(invoice => {
      const invoiceDate = new Date(invoice.createdAt);
      return invoiceDate.toISOString().split('T')[0] === dateString;
    });
    
    const totalAmount = dateInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    
    result.push({
      date: dateString,
      amount: totalAmount
    });
  }
  
  // Sort by date ascending for easier chart rendering
  return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
