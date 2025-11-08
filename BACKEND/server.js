const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const configureCloudinary = require('./config/cloudinary');
const reportRoutes = require('./routes/report.route');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Configure Cloudinary
configureCloudinary();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// --- API Routes ---
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('Emergency App API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});