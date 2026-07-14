import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

const SYSTEM_PROMPT = `
You are a helpful AI tutor.

Always explain topics in great detail.

Give examples.

Use bullet points whenever possible.

Do not give short answers unless the user explicitly asks for one.
`;

const messages = [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
];

async function main() {
  const rl = readline.createInterface({ input, output });

   while (true) {
   const userInput = await rl.question('\nSir: ');

    if (userInput.toLowerCase() === 'exit') break;

    messages.push({
      role: "user",
      content: userInput,
    });
    // now we'll write streaming code here
    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      stream: true,
    });
    let assistantResponse = "";
    process.stdout.write("AI: ");
    for await (const event of stream) {
        const content = event.choices[0].delta?.content || "";
        assistantResponse += content;
        process.stdout.write(content);
    }
    process.stdout.write("\n");

    messages.push({
      role: "assistant",
      content: assistantResponse,
    });

   }

   rl.close();
}

main();