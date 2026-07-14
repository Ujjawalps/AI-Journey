# 🌦️ Weather AI Agent

> **Module 1 - GenAI Fundamentals**
>
> This is my first Generative AI project. The goal was not to build a weather application, but to understand how Large Language Models (LLMs), prompts, messages, and AI agents work behind the scenes.

---

# 📚 Learning Goal

Before building my main project (**ScrollDamage AI Content Operating System**), I want to master the fundamentals of Generative AI and Agentic AI.

This Weather Agent is my first step.

Instead of jumping directly into AI frameworks, I am learning how AI systems work from scratch.

---

# 🎯 Project Objective

Build a simple AI-powered Weather Agent that can:

- Accept user input.
- Understand the request using an LLM.
- Decide which tool to use.
- Execute a JavaScript function.
- Return the final answer.

The purpose is to understand the internal workflow of an AI Agent.

---

# 🧠 Concepts Learned

## 1. Large Language Model (LLM)

An LLM is the brain of the application.

It understands natural language, reasons about the request, and decides what to do.

Example:

User:

```
What's the weather in New York?
```

↓

LLM understands the request.

↓

LLM decides that weather information is required.

---

## 2. API

Instead of running the AI locally, my application communicates with an external LLM using an API.

Flow:

```
Node.js

↓

Groq API

↓

LLM

↓

Response
```

---

## 3. System Prompt

The System Prompt defines the behaviour of the AI.

Example:

```
You are a helpful weather assistant.
```

Without a System Prompt, the model behaves like a general assistant.

With a System Prompt, it behaves like a Weather Agent.

---

## 4. Messages

Messages store the entire conversation.

Example:

```
System

↓

User

↓

Assistant

↓

Observation

↓

Assistant
```

Important:

LLMs are **stateless**.

They do **not remember previous conversations**.

Every API request sends the complete message history.

---

## 5. Agent Loop

This project introduced me to the basic Agent Loop.

Workflow:

```
User

↓

LLM

↓

Action

↓

JavaScript Tool

↓

Observation

↓

LLM

↓

Output
```

This is the core idea behind modern AI Agents.

---

## 6. Tool

The Weather Tool is a normal JavaScript function.

```js
getWeatherDetails(location)
```

The LLM cannot execute JavaScript directly.

Instead:

1. LLM requests the tool.
2. My backend executes the function.
3. The result is returned to the LLM.

---

## 7. Observation

Observation is the result returned by the tool.

Example:

```
10°C, cloudy
```

This observation is added back into the conversation.

The LLM then generates the final answer using this information.

---

## 8. Structured Output

Instead of free-form text, the LLM responds using JSON.

Example:

```json
{
  "type":"action",
  "function":"getWeatherDetails",
  "input":"New York"
}
```

Structured outputs are easier for programs to understand.

---

# 🏗 Architecture

```
            User
              │
              ▼
      readline-sync
              │
              ▼
       Message History
              │
              ▼
          Groq LLM
              │
      ┌───────┴────────┐
      │                │
 Action Requested?     Output?
      │                │
      ▼                ▼
Weather Tool      Print Answer
      │
      ▼
 Observation
      │
      ▼
Send Back to LLM
```

---

# ⚙ Project Flow

```
User

↓

System Prompt

↓

Messages

↓

LLM

↓

Action

↓

JavaScript Function

↓

Observation

↓

LLM

↓

Final Response
```

---

# 💡 Notes

## Why do we use a Message Array?

Because the LLM is stateless.

It only knows what we send in the current request.

---

## Why do we push Observation?

Because the LLM does not know the tool result.

The backend executes the tool and sends the result back.

---

## Why doesn't the LLM execute JavaScript?

Because LLMs generate text.

They cannot directly execute code.

The backend is responsible for executing functions.

---

## Why JSON?

Programs understand structured data much better than plain English.

This makes it easy to build AI Agents.

---

# 📁 Tech Stack

- JavaScript
- Node.js
- Groq API
- OpenAI SDK
- dotenv
- readline-sync

---

# 📖 What I Learned

By building this project, I understood:

- How to connect an LLM using an API.
- How prompts influence model behaviour.
- How conversation history is managed.
- How AI Agents interact with tools.
- Why observations are required.
- How structured outputs make automation easier.
- Why backend code is responsible for executing tools.
- The difference between an LLM and an AI Agent.

---

# 🚀 Next Learning Goal

Module 2 — LLM Engineering

Topics:

- Native Tool Calling
- Function Calling
- Streaming Responses
- Context Window
- Conversation Memory
- Prompt Engineering
- Model Parameters
- Error Handling

After completing Module 2, I will start building the backend of my main project:

> **ScrollDamage AI Content Operating System**

---

# 📌 Personal Note

This project marks the beginning of my AI Engineering journey.

My goal is not only to use AI APIs, but to understand how AI systems are designed, built, and deployed in production.

Every project in this repository is a step toward building intelligent software that solves real-world problems.