const express = require('express');
const router = express.Router(); // <-- This defines the router
const cloudinary = require('cloudinary').v2;
const upload = require('../middleware/multer'); // Our multer middleware
const Report = require('../models/report.model'); // Our Report model

/**
 * @route   POST /api/reports
 * @desc    Create a new emergency report (Step 1: Media ONLY)
 */
router.post('/', upload.single('media'), async (req, res) => {
  try {
    // const { latitude, longitude } = req.body; // <-- Location is TEMPORARILY commented out

    // --- 1. Validation ---
    if (!req.file) {
      return res.status(400).json({ message: 'No media file was uploaded.' });
    }
    /* <-- Location validation is TEMPORARILY commented out
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Location is required.' });
    }
    */

    // --- 2. Upload to Cloudinary ---
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "emergency_reports",
        resource_type: "auto" 
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary Error:', error);
          return res.status(500).json({ message: 'Error uploading to Cloudinary.' });
        }

        // --- 3. Create the new Report in MongoDB ---
        const newReport = new Report({
          mediaUrl: result.secure_url,
          mediaId: result.public_id,
          mediaType: result.resource_type,
          /* <-- Location data is TEMPORARILY commented out
          location: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          }
          */
        });

        await newReport.save();

        res.status(201).json({
          message: 'Emergency report filed successfully.',
          report: newReport
        });
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (err) {
    console.error('Server Error:', err);
    res.status(5.00).json({ message: 'Server error.' });
  }
});

/**
 * @route   PATCH /api/reports/:id/details
 * @desc    Add follow-up form data to an existing report (Step 2: Form)
 */
router.patch('/:id/details', async (req, res) => {
  try {
    const { name, phone, details } = req.body;

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    report.formData = {
      name: name || report.formData.name,
      phone: phone || report.formData.phone,
      details: details || report.formData.details
    };

    const updatedReport = await report.save();

    res.status(200).json({
      message: 'Report details added.',
      report: updatedReport
    });

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;