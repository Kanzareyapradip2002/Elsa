import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment variables (replace with a secure method)
const API_KEY = "AIzaSyAR9HoPwA43EYKGsiVc3UjsbxTaVXcVuyk";

if (!API_KEY) {
    throw new Error("API key is missing. Set REACT_APP_GOOGLE_API_KEY in your environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens:1000,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating response:", error);
        return "An error occurred while processing your request.";
    }
}

export default run;
