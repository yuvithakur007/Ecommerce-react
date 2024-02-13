// Import required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

module.exports = mongoose.connection;
