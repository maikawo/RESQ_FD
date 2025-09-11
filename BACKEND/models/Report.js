const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('Report', reportSchema);