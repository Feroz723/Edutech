import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, './.env');

dotenv.config({ path: envPath });

console.log("Diagnostic check for GEMINI_API_KEY...");
console.log("Path checked:", envPath);
console.log("Key present:", !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
    console.log("Key prefix:", process.env.GEMINI_API_KEY.substring(0, 10));
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function testGemini() {
    try {
        console.log("Attempting to list models...");
        // In the @google/generative-ai SDK, listModels is not directly on genAI usually
        // but it might be. Let's try to find it.
        // Actually, let's try a different approach: try gemini-1.5-pro
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-pro:", result.response.text());
    } catch (error) {
        console.error("Diagnostic Failed:");
        console.error("Message:", error.message);

        // Let's try to hit the REST API directly to see what's wrong
        try {
            console.log("Trying REST API direct hit...");
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.models) {
                console.log("Available Models:");
                data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods.join(',')})`));
            } else {
                console.log("No models found in response:", data);
            }
        } catch (fetchError) {
            console.error("REST Fetch Failed:", fetchError.message);
        }
    }
}

testGemini();
