import OpenAI from "openai";
import readlineSync from "readline-sync";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `
You are a helpful AI assistant.

Be friendly.

Answer clearly and concisely.
`;

const messages = [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
];

async function main() {
    while (true) {
        const userInput = readlineSync.question("User: ");

        if (userInput.toLowerCase() === "exit") break;

        messages.push({ role: "user", content: userInput }); // this is text sent by the user Like 'Hi' or "What's My name?"

        // LLM part here
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages
        });
        const assistantMessage = response.choices[0].message.content;

        messages.push({ role: "assistant", content: assistantMessage });

        console.log("\n🤖 Assistant:", assistantMessage);

    }
}
main();