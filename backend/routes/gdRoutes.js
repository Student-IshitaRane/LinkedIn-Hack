const express = require('express');
const router = express.Router();
const gdService = require('../services/gdService');

// Generate topic endpoint
router.post('/generate-topic', async (req, res) => {
  try {
    const { company, jobProfile } = req.body;
    const result = await gdService.generateGDTopic(company, jobProfile);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Topic generation failed" });
  }
});

// Generate AI response endpoint
router.post('/generate-response', async (req, res) => {
  try {
    const { topic, lastUserMessage, participantName, personality } = req.body;
    const result = await gdService.generateAIResponse({
      topic,
      lastUserMessage,
      participantName, 
      personality
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "AI response failed" });
  }
});

module.exports = router;
