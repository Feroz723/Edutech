import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelsToTry = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-flash-latest",
    "gemini-pro-latest"
];

async function tryModels() {
    for (const modelName of modelsToTry) {
        console.log(`Testing model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi, are you working?");
            const text = result.response.text();
            console.log(`SUCCESS with ${modelName}: ${text.substring(0, 50)}...`);
            return; // Stop if one works
        } catch (err) {
            console.log(`FAILED with ${modelName}: ${err.message.substring(0, 100)}`);
        }
    }
}

tryModels();
