import { 
  User, 
  Prescription, 
  PrescriptionDetail, 
  Medicine,
  getPrescriptionsByStatus,
  getUserById,
  getPrescriptionDetailsByPrescriptionId,
  getMedicineById,
  getAllInvoices,
  initializeData
} from '../datats/mockPatients';
import * as apiService from '../services/api.service';

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
export const getPatientsWithPendingPrescriptions = async (): Promise<PharmacyPatient[]> => {
  try {
    // Try to get authentication token from localStorage
    const tokenFromStorage = localStorage.getItem('token');
    
    if (tokenFromStorage) {
      try {
        console.log('Fetching pending prescriptions with status PENDING_DISPENSE from API');
        // If we have a token, try to use the real API
        const prescriptions = await apiService.getPrescriptions({ status: 'PENDING_DISPENSE' }, tokenFromStorage);
        console.log(`Fetched ${prescriptions.length} prescriptions with status PENDING_DISPENSE`);
        
        const result: PharmacyPatient[] = [];
        
        for (const prescription of prescriptions) {
          // The API already populates patientId and doctorId
          const patient = prescription.patientId;
          const doctor = prescription.doctorId;
          
          if (!patient || !doctor) {
            console.warn(`Prescription ${prescription._id} is missing patient or doctor data, skipping`);
            continue;
          }
          
          try {
            // Get prescription details
            console.log(`Fetching prescription details for prescription ID: ${prescription._id}`);
            const prescriptionDetails = await apiService.getPrescriptionDetails(prescription._id, tokenFromStorage);
            console.log(`Fetched ${prescriptionDetails.length} prescription details`);
            
            // Map prescription details to medicines
            const medicines: PharmacyMedicine[] = [];
            
            for (const detail of prescriptionDetails) {
              // We need to get medicine details for each prescription detail
              try {
                const medicine = await apiService.getMedicineById(detail.medicineId, tokenFromStorage);
                medicines.push({
                  name: medicine?.name || 'Unknown',
                  quantity: detail.quantity,
                  dosage: detail.dosage,
                  price: medicine?.price || 0
                });
              } catch (medError) {
                console.warn(`Error fetching medicine ${detail.medicineId}, falling back to mock data:`, medError);
                // If we can't get the medicine from API, use mock data
                const mockMedicine = await getMedicineById(detail.medicineId);
                medicines.push({
                  name: mockMedicine?.name || 'Unknown',
                  quantity: detail.quantity,
                  dosage: detail.dosage,
                  price: mockMedicine?.price || 0
                });
              }
            }
            
            result.push({
              id: prescription._id,
              serialNumber: prescription.customPrescriptionId,
              fullName: patient?.fullName || 'Unknown',
              phone: patient?.phone || 'N/A',
              diagnosis: prescription.diagnosis,
              doctor: doctor?.fullName || 'Không xác định',
              prescription: medicines
            });
          } catch (detailsError) {
            console.error(`Error fetching prescription details for prescription ${prescription._id}:`, detailsError);
          }
        }
        
        console.log(`Prepared ${result.length} pharmacy patients with their prescription details`);
        return result;
      } catch (apiError) {
        console.error("API error, falling back to mock data:", apiError);
        // Fall back to mock data if API fails
        return fetchMockPendingPrescriptions();
      }
    } else {
      console.log("No authentication token found, using mock data");
      // If no token, use mock data
      return fetchMockPendingPrescriptions();
    }
  } catch (error) {
    console.error("Error fetching pending prescriptions:", error);
    return [];
  }
};

// Separate function for fetching mock data
const fetchMockPendingPrescriptions = async (): Promise<PharmacyPatient[]> => {
  console.log('Fetching pending prescriptions from mock data');
  // Initialize mock data if needed
  await initializeData();
  
  const pendingPrescriptions = await getPrescriptionsByStatus('PENDING_DISPENSE');
  console.log(`Fetched ${pendingPrescriptions.length} mock prescriptions with status PENDING_DISPENSE`);
  
  const result: PharmacyPatient[] = [];
  
  for (const prescription of pendingPrescriptions) {
    try {
      // Get patient details
      const patient = await getUserById(prescription.patientId);
      if (!patient) {
        console.warn(`Mock patient with ID ${prescription.patientId} not found for prescription ${prescription._id}`);
        continue;
      }
      
      // Get doctor details
      const doctor = await getUserById(prescription.doctorId);
      if (!doctor) {
        console.warn(`Mock doctor with ID ${prescription.doctorId} not found for prescription ${prescription._id}`);
        continue;
      }
      
      // Get prescription details
      const prescriptionDetails = await getPrescriptionDetailsByPrescriptionId(prescription._id);
      console.log(`Found ${prescriptionDetails.length} mock prescription details for prescription ${prescription._id}`);
      
      // Map prescription details to medicines
      const medicines: PharmacyMedicine[] = [];
      
      for (const detail of prescriptionDetails) {
        try {
          const medicine = await getMedicineById(detail.medicineId);
          if (!medicine) {
            console.warn(`Mock medicine with ID ${detail.medicineId} not found`);
            medicines.push({
              name: 'Unknown Medicine',
              quantity: detail.quantity,
              dosage: detail.dosage,
              price: 0
            });
            continue;
          }
          
          medicines.push({
            name: medicine.name,
            quantity: detail.quantity,
            dosage: detail.dosage,
            price: medicine.price
          });
        } catch (medError) {
          console.error(`Error processing mock medicine for detail ${detail._id}:`, medError);
          medicines.push({
            name: 'Error Loading Medicine',
            quantity: detail.quantity,
            dosage: detail.dosage,
            price: 0
          });
        }
      }
      
      result.push({
        id: prescription._id,
        serialNumber: prescription.customPrescriptionId,
        fullName: patient.fullName,
        phone: patient.phone || 'N/A',
        diagnosis: prescription.diagnosis,
        doctor: doctor.fullName || 'Không xác định',
        prescription: medicines
      });
    } catch (error) {
      console.error(`Error processing mock prescription ${prescription._id}:`, error);
    }
  }
  
  console.log(`Prepared ${result.length} pharmacy patients from mock data`);
  return result;
};

// Function to get pharmacy invoice data
export const getPharmacyInvoices = async (): Promise<PharmacyInvoice[]> => {
  try {
    const invoices = await getAllInvoices();
    const result: PharmacyInvoice[] = [];
    
    for (const invoice of invoices) {
      // Get pharmacist information (default to a specific ID if needed)
      const pharmacist = await getUserById('685face13fc4c04e1bd96c0a'); // Default pharmacist ID
      
      // Return formatted invoice data
      result.push({
        id: invoice._id,
        date: invoice.createdAt, // Use createdAt as the invoice date
        patientId: invoice.patientId,
        pharmacistName: pharmacist?.fullName || 'Nhân viên phát thuốc',
        totalAmount: invoice.totalAmount
      });
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching pharmacy invoices:", error);
    return [];
  }
};

// Function to get daily revenue data for statistics
export const getDailyRevenue = async () => {
  try {
    const today = new Date();
    const result = [];
    
    // Get all invoices
    const allInvoices = await getAllInvoices();
    
    // Create revenue data for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Sum all invoices for this date
      const dateInvoices = allInvoices.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        return invoiceDate.toISOString().split('T')[0] === dateString;
      });
      
      const totalAmount = dateInvoices.reduce((sum: number, invoice) => sum + invoice.totalAmount, 0);
      
      result.push({
        date: dateString,
        amount: totalAmount
      });
    }
    
    // Sort by date ascending for easier chart rendering
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Error getting daily revenue:", error);
    return [];
  }
};

// Function to create a new pharmacy invoice
export const createPharmacyInvoice = async (
  prescriptionId: string, 
  totalAmount: number, 
  token: string
): Promise<boolean> => {
  try {
    if (!token) {
      console.error("No authentication token provided");
      return false;
    }
    
    console.log(`Creating pharmacy invoice for prescription ${prescriptionId} with total amount ${totalAmount}`);
    
    // 1. Update prescription status to DISPENSED
    try {
      await apiService.updatePrescriptionStatus(prescriptionId, 'DISPENSED', token);
      console.log(`Updated prescription ${prescriptionId} status to DISPENSED`);
    } catch (statusError) {
      console.error("Error updating prescription status:", statusError);
      // Even if status update fails, we'll try to continue with invoice creation
    }
    
    // TODO: In a real implementation, we would also create an actual invoice record
    // For now we just mark the prescription as dispensed
    
    // Simulate successful invoice creation
    const now = new Date();
    const invoiceDate = now.toISOString();
    
    console.log(`Simulated invoice created at ${invoiceDate} for prescription ${prescriptionId}`);
    
    return true;
  } catch (error) {
    console.error("Error creating pharmacy invoice:", error);
    return false;
  }
};

// Function to get real-time pharmacy statistics
export const getPharmacyStats = async (token: string | null) => {
  try {
    console.log("Fetching pharmacy statistics");
    
    if (token) {
      try {
        // Try to get real counts from the API
        // Get all dispensed prescriptions today
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
        
        // Count prescriptions by status
        const dispensedToday = await getPrescriptionsCountByStatus('DISPENSED', token, startOfDay);
        const pendingDispense = await getPrescriptionsCountByStatus('PENDING_DISPENSE', token);
        
        console.log(`API stats: ${dispensedToday} dispensed today, ${pendingDispense} pending`);
        
        return {
          dispensedToday,
          pendingDispense,
          totalRevenue: calculateTotalRevenue(dispensedToday),
          averageValue: dispensedToday > 0 ? calculateTotalRevenue(dispensedToday) / dispensedToday : 0
        };
      } catch (apiError) {
        console.error("Error fetching pharmacy stats from API:", apiError);
        // Fall back to mock data
      }
    }
    
    // Return mock statistics
    console.log("Using mock pharmacy statistics");
    return {
      dispensedToday: 5,
      pendingDispense: 3,
      totalRevenue: 1250000,
      averageValue: 250000
    };
  } catch (error) {
    console.error("Error getting pharmacy stats:", error);
    return {
      dispensedToday: 0,
      pendingDispense: 0,
      totalRevenue: 0,
      averageValue: 0
    };
  }
};

// Helper function to get prescription counts by status
async function getPrescriptionsCountByStatus(status: string, token: string, startDate?: string): Promise<number> {
  try {
    const params: any = { status };
    if (startDate) {
      // If startDate is provided, we're looking for prescriptions created after this date
      params.startDate = startDate;
    }
    
    const prescriptions = await apiService.getPrescriptions(params, token);
    return prescriptions.length;
  } catch (error) {
    console.error(`Error getting count for ${status} prescriptions:`, error);
    return 0;
  }
}

// Helper function to calculate estimated revenue
function calculateTotalRevenue(dispensedCount: number): number {
  // Simple estimation - average 250,000 VND per prescription
  const averagePerPrescription = 250000;
  return dispensedCount * averagePerPrescription;
}
