const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = require('./config/db');
connectDB();
app.use(express.static(path.join(__dirname, 'public')));

// All other routes return React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Routes
app.use('/api/calls', require('./routes/calls'));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

// All other routes return React app
// Recommended for Express 5 + path-to-regexp 8
app.get('/:any(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});