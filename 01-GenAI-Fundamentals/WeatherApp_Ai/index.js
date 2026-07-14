import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import readlineSync from "readline-sync";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Tool
function getWeatherDetails(location) {
  const city = location.toLowerCase();

  if (city === "new york") return "10°C, cloudy";
  if (city === "los angeles") return "25°C, sunny";
  if (city === "chicago") return "5°C, windy";

  return "Weather data not available for this location.";
}

const SYSTEM_PROMPT = `
You are a helpful weather assistant.

You have access to one tool:

Tool:
- getWeatherDetails(location)

Always reply ONLY in JSON.

Available response types:

1.
{
  "type":"plan",
  "plan":"what you are going to do"
}

2.
{
  "type":"action",
  "function":"getWeatherDetails",
  "input":"city name"
}

3.
{
  "type":"output",
  "output":"final answer to user"
}

4.
{
  "type":"observation",
  "observation":"tool result"
}

Rules:

- Never make up weather.
- Always call the tool first.
- After observation, return output.
`;

const messages = [
  {
    role: "system",
    content: SYSTEM_PROMPT
  }
];

async function main() {

  while (true) {

    const userPrompt = readlineSync.question("\nUser: ");

    if (userPrompt.toLowerCase() === "exit") break;

    messages.push({
      role: "user",
      content: JSON.stringify({
        type: "user",
        user: userPrompt
      })
    });
    console.log("\n================ USER ADDED ================");
    console.dir(messages, { depth: null });

    while (true) {

      try {

        const response = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages,
          response_format: {
            type: "json_object"
          }
        });

        const assistantMessage = response.choices[0].message.content;

        const parsed = JSON.parse(assistantMessage);

        messages.push({
          role: "assistant",
          content: assistantMessage
        });
        console.log("\n============= ASSISTANT ADDED =============");
        console.dir(messages, { depth: null });

        console.log("\nAssistant:", parsed);

        if (parsed.type === "plan") {

          continue;

        }

        if (parsed.type === "action") {

          let observation = "";

          if (parsed.function === "getWeatherDetails") {
            observation = getWeatherDetails(parsed.input);
          }

          messages.push({
            role: "user",
            content: JSON.stringify({
              type: "observation",
              observation
            })
          });
          console.log("\n============ OBSERVATION ADDED ============");
          console.dir(messages, { depth: null });

          console.log("Observation:", observation);

          continue;
        }

        if (parsed.type === "output") {

          console.log("\n🤖", parsed.output);

          break;
        }

      } catch (err) {

        console.error(err);
        break;

      }

    }

  }

}

main();