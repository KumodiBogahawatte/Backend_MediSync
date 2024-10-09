// server.js
const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/api/patientRoutes');
const db = require('./config/database');
const PORT = 8082;

const app = express();
app.use(cors());
app.use(express.json());

// // Route for the root URL
// app.get('/', (req, res) => {
//     res.send('Welcome to the MediSync API!'); // Response for the root URL
// });

// Use patient routes
app.use('/patients', patientRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
