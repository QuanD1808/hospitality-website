// Debug file to check if prescriptions are being fetched correctly
// This file is meant to be executed in the browser console

// Check if token is available
const token = localStorage.getItem('token');
console.log('Token available:', !!token);
if (token) {
    console.log('Token first 10 chars:', token.substring(0, 10) + '...');
}

// Test API call to fetch pending prescriptions
async function testFetchPendingPrescriptions() {
    try {
        console.log('Fetching pending prescriptions manually...');
        const response = await fetch('http://localhost:5000/api/prescriptions?status=PENDING_DISPENSE', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            const errorData = await response.json();
            console.error('Error details:', errorData);
            return;
        }
        
        const data = await response.json();
        console.log('API returned', data.length, 'prescriptions');
        console.log('Prescriptions:', data);
    } catch (error) {
        console.error('Error testing API:', error);
    }
}

// Test the implementation from pharmacyUtils
async function testGetPatientsWithPendingPrescriptions() {
    try {
        const { getPatientsWithPendingPrescriptions } = await import('./pharmacyUtils.js');
        console.log('Testing getPatientsWithPendingPrescriptions...');
        const patients = await getPatientsWithPendingPrescriptions();
        console.log('Function returned', patients.length, 'patients');
        console.log('Patients:', patients);
    } catch (error) {
        console.error('Error testing implementation:', error);
    }
}

// Run tests
testFetchPendingPrescriptions();
setTimeout(() => {
    testGetPatientsWithPendingPrescriptions();
}, 1000);
