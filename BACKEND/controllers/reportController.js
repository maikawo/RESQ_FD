const cloudinary = require('cloudinary').v2;
const Report = require('../models/Report');

exports.getCloudinarySignature = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp: timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  res.status(200).json({
    signature,
    timestamp,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

exports.saveReport = async (req, res) => {
  try {
    const { imageUrl, latitude, longitude } = req.body;
    const newReport = new Report({
      imageUrl,
      location: {
        latitude,
        longitude,
      },
    });
    await newReport.save();
    res.status(201).json({ message: 'Report saved successfully!', report: newReport });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save report', error: error.message });
  }
};