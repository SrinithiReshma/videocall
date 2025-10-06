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

// API Routes FIRST - Very Important!
app.use('/api/calls', require('./routes/calls'));

// Serve static files SECOND
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});