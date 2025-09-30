const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');


// Load environment variables
dotenv.config();


// Connect to MongoDB
connectDB();


const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/samples', require('./routes/sampleRoutes'));


// No static frontend serving here - frontend will be deployed separately


// Default route for test or health check
app.get('/', (req, res) => {
  res.send('Backend API is running...');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
