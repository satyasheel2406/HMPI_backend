const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');  // <-- add this


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

// Serve frontend static files from 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html for root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
