const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/get-cloudinary-signature', reportController.getCloudinarySignature);

router.post('/save', reportController.saveReport);

module.exports = router;