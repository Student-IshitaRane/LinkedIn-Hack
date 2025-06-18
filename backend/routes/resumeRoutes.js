const express = require('express');
const router = express.Router();
const { testConnection, analyzeResume } = require('../controllers/resumeController');
const upload = require('../utils/multerConfig');

// Test connection endpoint
router.post('/test', testConnection);

// Analyze resume endpoint
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;
