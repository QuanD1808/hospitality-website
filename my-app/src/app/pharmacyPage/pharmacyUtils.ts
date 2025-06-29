import * as apiService from '../services/api.service';

// Type definitions to match the pharmacy page UI needs
export interface PharmacyPatient {
  _id: string;
  prescriptionId: string;
  customPrescriptionId: string;
  fullName: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  diagnosis: string;
  doctorName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  medications: PharmacyMedication[];
}

export interface PharmacyMedication {
  _id: string;
  customPrescriptionDetailId: string;
  medicineId: string;
  medicineName: string;
  medicineUnit: string;
  quantity: number;
  dosage: string;
  price: number;
  total: number;
}

export interface PharmacyInvoice {
  id: string;
  date: string;
  patientId: string;
  pharmacistName: string;
  totalAmount: number;
}

// Function to get patients with pending prescriptions for the pharmacy
export const getPatientsWithPendingPrescriptions = async (): Promise<PharmacyPatient[]> => {
  try {
    // Try to get authentication token from localStorage
    const tokenFromStorage = localStorage.getItem('token');
    
    if (!tokenFromStorage) {
      console.error("No authentication token found");
      return [];
    }
    
    console.log('Fetching pending prescriptions with status PENDING_DISPENSE from API');
    
    // Fetch all prescriptions with status PENDING_DISPENSE
    const prescriptions = await apiService.getPendingDispensePrescriptions(tokenFromStorage);
    console.log(`Fetched ${prescriptions.length} prescriptions with status PENDING_DISPENSE`);
    
    const result: PharmacyPatient[] = [];
    
    for (const prescription of prescriptions) {
      try {
        // Get patient details
        const patient = await apiService.getPatientById(prescription.patientId, tokenFromStorage);
        if (!patient) {
          console.warn(`Patient with ID ${prescription.patientId} not found for prescription ${prescription._id}`);
          continue;
        }
        
        // Get doctor details
        const doctor = await apiService.getPatientById(prescription.doctorId, tokenFromStorage);
        if (!doctor) {
          console.warn(`Doctor with ID ${prescription.doctorId} not found for prescription ${prescription._id}`);
          continue;
        }
        
        // Get prescription details
        const prescriptionDetails = await apiService.getPrescriptionDetailsById(prescription._id, tokenFromStorage);
        console.log(`Found ${prescriptionDetails.length} prescription details for prescription ${prescription._id}`);
        
        // Map prescription details to medications
        const medications: PharmacyMedication[] = [];
        
        for (const detail of prescriptionDetails) {
          try {
            const medicine = await apiService.getMedicineById(detail.medicineId, tokenFromStorage);
            if (!medicine) {
              console.warn(`Medicine with ID ${detail.medicineId} not found`);
              continue;
            }
            
            // Calculate total price for this medication
            const total = medicine.price * detail.quantity;
            
            medications.push({
              _id: detail._id,
              customPrescriptionDetailId: detail.customPrescriptionDetailId || detail._id,
              medicineId: detail.medicineId,
              medicineName: medicine.name,
              medicineUnit: medicine.unit || 'unit',
              quantity: detail.quantity,
              dosage: detail.dosage,
              price: medicine.price,
              total: total
            });
          } catch (medError) {
            console.error(`Error processing medicine for detail ${detail._id}:`, medError);
          }
        }
        
        // Create pharmacy patient object
        result.push({
          _id: prescription._id,
          prescriptionId: prescription._id,
          customPrescriptionId: prescription.customPrescriptionId || prescription._id,
          fullName: patient.fullName,
          phone: patient.phone || 'N/A',
          dateOfBirth: patient.dateOfBirth || patient.dob,
          gender: patient.gender,
          diagnosis: prescription.diagnosis,
          doctorName: doctor.fullName,
          status: prescription.status,
          createdAt: prescription.createdAt,
          updatedAt: prescription.updatedAt,
          medications: medications
        });
      } catch (detailsError) {
        console.error(`Error processing prescription ${prescription._id}:`, detailsError);
      }
    }
    
    console.log(`Prepared ${result.length} pharmacy patients with their prescription details`);
    return result;
  } catch (error) {
    console.error("Error fetching pending prescriptions:", error);
    return [];
  }
};

// Create a pharmacy invoice and mark prescription as dispensed
export const createPharmacyInvoice = async (prescriptionId: string, totalAmount: number, token: string): Promise<boolean> => {
  try {
    console.log(`Creating invoice for prescription ${prescriptionId}`);
    
    // Update prescription status to DISPENSED
    await apiService.updatePrescriptionStatus(prescriptionId, 'DISPENSED', token);
    
    // In a real app, we would also create a proper invoice record in the database here
    console.log(`Updated prescription ${prescriptionId} status to DISPENSED`);
    
    return true;
  } catch (error) {
    console.error("Error creating pharmacy invoice:", error);
    return false;
  }
};

// Function to get pharmacy invoice data
export const getPharmacyInvoices = async (): Promise<PharmacyInvoice[]> => {
  try {
    // Try to get authentication token from localStorage
    const tokenFromStorage = localStorage.getItem('token');
    
    if (!tokenFromStorage) {
      console.error("No authentication token found");
      return [];
    }

    // In a real application, we would fetch invoice data from MongoDB here
    // For now, we'll return a sample set of invoices for demonstration
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return [
      {
        id: 'INV-' + Date.now().toString().slice(-8) + '-0001',
        date: today.toISOString(),
        patientId: 'sample-patient-id-1',
        pharmacistName: 'Nguyễn Thị Hà',
        totalAmount: 250000
      },
      {
        id: 'INV-' + Date.now().toString().slice(-8) + '-0002',
        date: yesterday.toISOString(),
        patientId: 'sample-patient-id-2',
        pharmacistName: 'Nguyễn Thị Hà',
        totalAmount: 350000
      }
    ];
  } catch (error) {
    console.error("Error fetching pharmacy invoices:", error);
    return [];
  }
};

// Function to get daily revenue data for statistics
export const getDailyRevenue = async () => {
  try {
    // Try to get authentication token from localStorage
    const tokenFromStorage = localStorage.getItem('token');
    
    if (!tokenFromStorage) {
      console.error("No authentication token found");
      return [];
    }

    // In a real application, we would fetch revenue data from MongoDB here
    // For now, we'll generate sample data for the last 7 days
    const result = [];
    const today = new Date();
    
    // Generate data for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      result.push({
        date: dateStr,
        amount: Math.floor(Math.random() * 500000) + 200000 // Random amount between 200,000 and 700,000
      });
    }
    
    // Sort by date ascending for easier chart rendering
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Error getting daily revenue:", error);
    return [];
  }
};
