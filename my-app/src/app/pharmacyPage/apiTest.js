// This file will help check the API connection with the backend
// Import the key functions for testing
import { getPendingDispensePrescriptions } from '../services/api.service';
import { getPatientsWithPendingPrescriptions } from './pharmacyUtils';

// Create test data for API testing
export const runApiTests = async (token) => {
  console.group('------- API TEST: BEGIN -------');
  console.log('Running API tests with token:', token ? `${token.substring(0, 10)}...` : 'No token');
  
  try {
    // Test 1: Direct API call
    console.log('Test 1: Calling getPendingDispensePrescriptions directly');
    const prescriptions = await getPendingDispensePrescriptions(token);
    console.log(`Result: Fetched ${prescriptions.length} prescriptions`);
    if (prescriptions.length > 0) {
      console.log('Sample prescription:', prescriptions[0]);
    } else {
      console.warn('No prescriptions found - this could be normal if there are none pending');
    }
    
    // Test 2: Using the pharmacy utility function
    console.log('Test 2: Calling getPatientsWithPendingPrescriptions');
    const patients = await getPatientsWithPendingPrescriptions();
    console.log(`Result: Got ${patients.length} patients with prescriptions`);
    if (patients.length > 0) {
      console.log('Sample patient:', patients[0]);
    } else {
      console.warn('No patients found - this could be normal if there are none pending');
    }
    
    return {
      success: true,
      prescriptionCount: prescriptions.length,
      patientCount: patients.length
    };
  } catch (error) {
    console.error('API Test failed:', error);
    return {
      success: false,
      error: error.message
    };
  } finally {
    console.groupEnd();
  }
};

// Function to check token in different storage locations
export const checkTokenAvailability = () => {
  const locations = {
    localStorage: localStorage.getItem('token'),
    cookies: document.cookie.split('; ').find(row => row.startsWith('token=')),
    sessionStorage: sessionStorage.getItem('token')
  };
  
  console.group('------- TOKEN CHECK -------');
  console.log('Token in localStorage:', locations.localStorage ? 'Present' : 'Missing');
  console.log('Token in cookies:', locations.cookies ? 'Present' : 'Missing');
  console.log('Token in sessionStorage:', locations.sessionStorage ? 'Present' : 'Missing');
  console.groupEnd();
  
  return locations;
};
