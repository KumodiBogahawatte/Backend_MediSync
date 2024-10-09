const express = require('express');
const patientController = require('../../controller/patientController');

const router = express.Router();

// Define routes for patient operations

// Fetch all patients
router.get('/', patientController.getAllPatients); 

// Fetch a patient by ID
router.get('/:patientID', patientController.getpatientById); 

 // Create a new patient
router.post('/', patientController.createPatient);

// Update a patient
router.put('/:patientID', patientController.updatePatient); 

 // Delete a patient
router.delete('/:patientID', patientController.deletePatient);

module.exports = router;
