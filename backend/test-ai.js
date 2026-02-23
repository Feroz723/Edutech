import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testChat() {
    console.log("Testing OpenAI with key:", process.env.OPENAI_API_KEY?.substring(0, 10) + "...");
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hi" }],
        });
        console.log("Success:", response.choices[0].message.content);
    } catch (error) {
        console.error("Error Status:", error.status);
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
    }
}

testChat();
