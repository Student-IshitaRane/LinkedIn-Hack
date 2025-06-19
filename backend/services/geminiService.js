// const { GoogleGenerativeAI } = require('@google/generative-ai');
import { GoogleGenerativeAI } from '@google/generative-ai';
// require('dotenv').config();

import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResumeWithGemini = async (resumeText, jobRole, company) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this resume for a ${jobRole} position at ${company}. Provide a detailed analysis with the following sections:
    
    1. ATS Score (0-100): A numerical score representing how well the resume is optimized for Applicant Tracking Systems.
    2. Analysis:
      - Strengths: 3-5 key strengths of the resume
      - Weaknesses: 3-5 areas that need improvement
      - Suggestions: 5-7 specific suggestions to improve the resume
    3. Keyword Matches:
      - Matched Keywords: List of important keywords from the job description that appear in the resume
      - Missing Keywords: List of important keywords that are missing
    
    Return the response in JSON format with this exact structure:
    {
      "ats_score": number,
      "analysis": {
        "strengths": string[],
        "weaknesses": string[],
        "suggestions": string[]
      },
      "keyword_matches": {
        "matched": string[],
        "missing": string[]
      }
    }
    
    Here is the resume text:
    ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response (Gemini sometimes adds markdown syntax)
    const cleanText = text.replace(/```json|```/g, '').trim();
    
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};

// module.exports = { analyzeResumeWithGemini };
export { analyzeResumeWithGemini };
