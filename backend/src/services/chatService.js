import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

// Lazy initialization of Gemini to avoid top-level timing issues
let genAI = null;
const getGenAI = () => {
    if (!genAI && process.env.GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    return genAI;
};

/**
 * Get AI response for chatbot
 */
export const getAIChatResponse = async (message) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is missing. Using fallbacks.");
            throw new Error("Missing Gemini key");
        }

        const genAIInstance = getGenAI();
        const model = genAIInstance.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `You are a helpful and knowledgeable education assistant for the Edutech platform. 
        Your goal is to assist students with their learning journey. 
        - You can explain complex concepts from their courses (e.g., programming, math, science, etc.).
        - You can answer general educational doubts.
        - You can help with platform navigation and course assignments.
        - Be encouraging, clear, and professional.
        - Use Markdown for structured responses (headers, bold, lists) to make information easy to read.
        
        Student says: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini AI Error:", error.message);
        if (error.stack) console.error(error.stack);

        // Add Fallback for better UX when API is down/limited
        const fallbackResponses = [
            "I'm here to help! Could you please tell me more about what you're looking for regarding your courses?",
            "That's an interesting question. While I'm having a brief connection issue with my AI brain, I can still help you navigate the platform. What do you need help with?",
            "I'm currently in 'offline mode' but I can still assist. Are you looking for your enrolled courses or course materials?",
            "I'm your Edutech learning companion. How can I assist you with your studies today?"
        ];

        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
};
