import { getAIChatResponse } from './src/services/chatService.js';

async function test() {
    console.log("Testing Chatbot Response...");
    try {
        const response = await getAIChatResponse("What is React JS?");
        console.log("AI Response:", response);
    } catch (err) {
        console.error("Test Error:", err);
    }
}

test();
