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

// Helper function to extract medicine ID properly
const extractMedicineId = (medicineId: any): string => {
  if (typeof medicineId === 'object' && medicineId !== null) {
    return medicineId._id || medicineId.id || '';
  }
  return medicineId || '';
};

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
                // Extract medicine ID properly
                const medicineId = extractMedicineId(detail.medicineId);
                console.log(`Getting medicine details for ID: ${medicineId}`);
                
                const medicine = await apiService.getMedicineById(medicineId, tokenFromStorage);
                medicines.push({
                  name: medicine?.name || 'Unknown',
                  quantity: detail.quantity,
                  dosage: detail.dosage,
                  price: medicine?.price || 0
                });
              } catch (medError) {
                console.warn(`Error fetching medicine from API, falling back to mock data:`, medError);
                // If we can't get the medicine from API, use mock data
                // Extract medicine ID properly for mock data too
                const medicineId = extractMedicineId(detail.medicineId);
                const mockMedicine = await getMedicineById(medicineId);
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
          // Extract medicine ID properly
          const medicineId = extractMedicineId(detail.medicineId);
          console.log(`Getting mock medicine details for ID: ${medicineId}`);
          
          const medicine = await getMedicineById(medicineId);
          if (!medicine) {
            console.warn(`Mock medicine with ID ${medicineId} not found`);
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
          console.error(`Error processing mock medicine:`, medError);
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
    
    // Try to get authentication token from localStorage
    const tokenFromStorage = localStorage.getItem('token');
    
    if (tokenFromStorage) {
      console.log('Using API to get daily revenue data');
      
      try {
        // Get data for the last 7 days using API
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateString = date.toISOString().split('T')[0];
          
          // Get start and end of the day
          const startDate = dateString;
          const endDate = dateString;
          
          // Use API to get revenue for this day
          const dailyData = await apiService.calculateRevenue(tokenFromStorage, startDate, endDate);
          
          result.push({
            date: dateString,
            amount: dailyData.totalAmount || 0
          });
        }
      } catch (apiError) {
        console.error('Error fetching daily revenue from API, falling back to mock data:', apiError);
        // Fall back to mock data if API fails
        return getDailyRevenueMock();
      }
    } else {
      console.log('No auth token, using mock data for daily revenue');
      // No token, use mock data
      return getDailyRevenueMock();
    }
    
    // Sort by date ascending for easier chart rendering
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Error getting daily revenue:", error);
    return [];
  }
};

// Mock function for daily revenue when API is not available
const getDailyRevenueMock = async () => {
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
    console.error("Error getting daily revenue mock data:", error);
    return [];
  }
};

// Function to get yearly revenue data for statistics
export const getYearlyRevenue = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const result = [];
    
    // Try to get authentication token from localStorage
    const tokenFromStorage = localStorage.getItem('token');
    
    if (tokenFromStorage) {
      console.log('Using API to get yearly revenue data');
      
      try {
        // Get data for the last 5 years using API
        for (let i = 0; i < 5; i++) {
          const year = currentYear - i;
          
          const yearlyData = await apiService.calculateYearlyRevenue(tokenFromStorage, year.toString());
          result.push({
            year: year.toString(),
            amount: yearlyData.totalAmount || 0
          });
        }
      } catch (apiError) {
        console.error('Error fetching yearly revenue from API, falling back to mock data:', apiError);
        // Fall back to mock data if API fails
        return getYearlyRevenueMock();
      }
    } else {
      console.log('No auth token, using mock data for yearly revenue');
      // No token, use mock data
      return getYearlyRevenueMock();
    }
    
    // Sort by year ascending for easier chart rendering
    return result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  } catch (error) {
    console.error("Error getting yearly revenue:", error);
    return [];
  }
};

// Mock function for yearly revenue when API is not available
const getYearlyRevenueMock = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const result = [];
    
    // Get all invoices
    const allInvoices = await getAllInvoices();
    
    // Calculate revenue for last 5 years
    for (let i = 0; i < 5; i++) {
      const year = currentYear - i;
      
      // Sum all invoices for this year
      const yearInvoices = allInvoices.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        return invoiceDate.getFullYear() === year;
      });
      
      const totalAmount = yearInvoices.reduce((sum: number, invoice) => sum + invoice.totalAmount, 0);
      
      result.push({
        year: year.toString(),
        amount: totalAmount
      });
    }
    
    // Sort by year ascending for easier chart rendering
    return result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  } catch (error) {
    console.error("Error getting yearly revenue mock data:", error);
    return [];
  }
};

// Function to create a pharmacy invoice and mark prescription as dispensed
export const createPharmacyInvoice = async (
  prescriptionId: string, 
  totalAmount: number, 
  token: string,
  medicines: PharmacyMedicine[] = []
): Promise<boolean> => {
  console.log(`Creating pharmacy invoice for prescription ${prescriptionId} with amount ${totalAmount}`);
  
  try {
    if (!token) {
      console.error("No authentication token available");
      throw new Error("Authentication required");
    }
    
    // Step 1: Mark prescription as DISPENSED
    console.log(`Updating prescription status to DISPENSED for ID: ${prescriptionId}`);
    await apiService.updatePrescriptionStatus(prescriptionId, 'DISPENSED', token);
    
    // Step 2: Deduct medicines from inventory
    if (medicines && medicines.length > 0) {
      console.log(`Processing ${medicines.length} medicines to update inventory`);
      
      // Get all prescription details for this prescription to get medicine IDs
      const prescriptionDetails = await apiService.getPrescriptionDetails(prescriptionId, token);
      
      // Create a map of medicine names to their IDs
      const medicineNameToIdMap = new Map();
      for (const detail of prescriptionDetails) {
        // Extract medicine ID and name properly
        if (detail.medicineId) {
          const medicine = detail.medicineId;
          const medicineName = typeof medicine === 'object' ? medicine.name : '';
          const medicineId = extractMedicineId(medicine);
          
          if (medicineName && medicineId) {
            medicineNameToIdMap.set(medicineName, medicineId);
          }
        }
      }
      
      // Process each medicine and deduct from inventory
      for (const med of medicines) {
        const medicineId = medicineNameToIdMap.get(med.name);
        
        if (medicineId) {
          console.log(`Deducting ${med.quantity} units of ${med.name} (ID: ${medicineId}) from inventory`);
          try {
            await apiService.deductMedicineStock(medicineId, med.quantity, token);
          } catch (deductError) {
            console.error(`Error deducting medicine ${med.name}:`, deductError);
            // Continue with other medicines even if one fails
          }
        } else {
          console.warn(`Could not find medicine ID for ${med.name}, skipping inventory update`);
        }
      }
    } else {
      console.log("No medicines to process for inventory update");
    }
    
    console.log(`Pharmacy invoice process completed successfully for prescription ${prescriptionId}`);
    return true;
  } catch (error: any) {
    console.error("Error creating pharmacy invoice:", error);
    return false;
  }
};
