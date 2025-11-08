// Add this line to import Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Your PointSchema for GeoJSON
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'], // 'location.type' must be 'Point'
    required: true
  },
  coordinates: {
    type: [Number], // Array of numbers for [longitude, latitude]
    required: true
  }
});

// The main Report schema
const reportSchema = new Schema({
  reportType: {
    type: String,
    required: true,
    enum: ['Fire', 'Flood', 'Earthquake', 'Other'] // Example types
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: pointSchema,
    required: true,
    // Add a 2dsphere index for geospatial queries (e.g., "find reports near me")
    index: '2dsphere' 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assumes you have a 'User' model
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved']
  }
}, {
  // Adds createdAt and updatedAt timestamps automatically
  timestamps: true 
});

// Create the model from the schema
const Report = mongoose.model('Report', reportSchema);

// Export the model so your routes can use it
module.exports = Report;