// services/gdService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate discussion topic
async function generateGDTopic(company, jobProfile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Generate a debate-style discussion topic for ${jobProfile} candidates at ${company}. 
      Requirements:
      1. Must spark discussion (no simple yes/no answers)
      2. Should relate to current industry trends (2024)
      3. Format as a question starting with "How" or "Should"
      
      Example: "How should ${company} balance AI innovation with ethical considerations in ${jobProfile} roles?"
      Return ONLY the question.`;

    const result = await model.generateContent(prompt);
    let topic = (await result.response).text();
    
    // Clean response
    topic = topic.replace(/^["']|["']$/g, '').trim();
    if (!topic.endsWith('?')) topic += '?';
    
    return { topic };
  } catch (error) {
    console.error('Gemini Error:', error);
    return {
      topic: `How should ${company} innovate in ${jobProfile} while maintaining quality?`,
      isFallback: true
    };
  }
}

// Generate AI participant response
async function generateAIResponse({ topic, conversation, participantName, personality }) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const personalityInstructions = {
      analytical: `Respond as ${participantName}, the data-driven analyst. 
        - Reference specific metrics/studies
        - Use phrases like "The data shows..."
        - Suggest measurable approaches`,
      supportive: `Respond as ${participantName}, the collaborative team player.
        - Build on others' ideas
        - Use phrases like "Building on that..."
        - Find consensus points`,
      challenging: `Respond as ${participantName}, the critical thinker.
        - Question assumptions
        - Cite counter-examples
        - Use phrases like "Have we considered..."`
    };

    const prompt = `CONTEXT: Group discussion about "${topic}"
    
    RECENT DISCUSSION:
    ${conversation.join('\n')}

    ROLE: You are ${participantName} (${personality})
    ${personalityInstructions[personality]}

    REQUIREMENTS:
    1. DIRECTLY address the most recent point
    2. Add your ${personality} perspective
    3. Keep response to 1-2 sentences MAX
    4. NEVER use placeholders like [...] or generic text

    EXAMPLE GOOD RESPONSE:
    "${participantName}: While that's valid (acknowledgement), our data shows 60% of cases require alternative approaches (perspective)"`;

    const result = await model.generateContent(prompt);
    let response = (await result.response).text();
    
    // Clean response
    response = response.replace(/^["']|["']$/g, '').trim();
    
    // Ensure response starts with participant name
    if (!response.startsWith(participantName)) {
      response = `${participantName}: ${response}`;
    }
    
    return { response };
  } catch (error) {
    console.error('Gemini Error:', error);
    throw error;
  }
}

module.exports = { generateGDTopic, generateAIResponse };
