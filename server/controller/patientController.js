const connectDatabase = require('../config/database'); // Import the promise-based database connection function

// Fetch all patients
const getAllPatients = async (req, res) => {
    try {
        const db = await connectDatabase(); // Get the database connection
        const [results] = await db.query('SELECT * FROM patient');
        return res.json(results);
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: "Database query failed" });
    }
};

// Fetch a patient by ID
const getpatientById = async (req, res) => {
    const patientId = req.params.patientID;
    const sqlQuery = 'SELECT * FROM patient WHERE patientID = ?';

    try {
        const db = await connectDatabase(); // Get the database connection
        const [results] = await db.query(sqlQuery, [patientId]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.json(results[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: "Database query failed" });
    }
};

// Create a new patient
const createPatient = async (req, res) => {
    const { patientName, patientAge, patientEmail } = req.body;
    const sqlQuery = 'INSERT INTO patient (patientName, patientAge, patientEmail) VALUES (?, ?, ?)';

    try {
        const db = await connectDatabase(); // Get the database connection
        const [results] = await db.query(sqlQuery, [patientName, patientAge, patientEmail]);
        return res.status(201).json({ id: results.insertId, message: "Patient created successfully" });
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: "Database query failed" });
    }
};

// Update a patient by ID
const updatePatient = async (req, res) => {
    const patientId = req.params.patientID;
    const { patientName, patientAge, patientEmail } = req.body;
    const sqlQuery = 'UPDATE patient SET patientName = ?, patientAge = ?, patientEmail = ? WHERE patientID = ?';

    try {
        const db = await connectDatabase(); // Get the database connection
        const [results] = await db.query(sqlQuery, [patientName, patientAge, patientEmail, patientId]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.json({ message: "Patient updated successfully" });
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: "Database query failed" });
    }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
    const patientId = req.params.patientID;
    const sqlQuery = 'DELETE FROM patient WHERE patientID = ?';

    try {
        const db = await connectDatabase(); // Get the database connection
        const [results] = await db.query(sqlQuery, [patientId]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.json({ message: "Patient deleted successfully" });
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: "Database query failed" });
    }
};

module.exports = {
    getAllPatients,
    getpatientById,
    createPatient,
    updatePatient,
    deletePatient
};
