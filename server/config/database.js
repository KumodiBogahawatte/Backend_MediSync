require('dotenv').config(); // Load environment variables
const mysql = require('mysql2/promise'); // Use promise-based version

// Create a function to connect to the database
const connectDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306, // Default port if not specified
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Connected to the MySQL database successfully!');
        return connection; // Return the connection if needed
    } catch (err) {
        console.error('Error connecting to the MySQL database:', err.message);
        throw err; // Re-throw the error for handling in server.js
    }
};

// Export the function
module.exports = connectDatabase;
