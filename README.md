# Ta-da 🎉

An agentic AI-powered surprise planning web application that helps users turn a simple idea into a thoughtful, personalized surprise plan.

Built with **Next.js**, **Google Gemini 2.5 Flash**, and **Tailwind CSS**.

---

## 🌟 Overview

Planning a memorable surprise—whether it's a birthday, anniversary, proposal, date night, or personal milestone—can involve a surprising amount of thinking and coordination.

**Ta-da** starts with a simple idea.

Instead of forcing the user through a fixed questionnaire, the AI analyzes what they've already shared, identifies the information that is actually missing, asks targeted questions, evaluates whether it has enough context, and then creates a personalized surprise plan.

The core experience is:

**Tell → Ask → Understand → Plan**

---

## ✨ Key Features

* **Agentic Workflow Architecture**
  Combines flexible AI decision-making with deterministic application guardrails. Gemini determines what information is missing and what questions are useful, while the application controls the workflow and stopping conditions.

* **Dynamic Question Generation**
  Questions are not simply hardcoded. The AI analyzes the user's initial idea and dynamically determines what additional information is needed.

* **Context Evaluation**
  After collecting answers, the AI evaluates whether enough information exists to create a useful plan. A limited follow-up step can be used when an important detail is still missing.

* **Personalized Surprise Plans**
  Generates structured, time-based plans that reflect the user's occasion, idea, preferences, location, budget, and other details.

* **Graceful Development Fallback**
  Includes a structured mock AI mode that allows the complete workflow and UI to be tested without consuming Gemini API quota during development.

* **Usage Guardrails**
  The workflow is intentionally constrained to avoid unnecessary LLM calls and uncontrolled question loops.

* **Print & PDF Export**
  Provides a print-optimized version of the final plan that can be saved as a PDF or printed.

* **Instant Sharing**
  Formats the generated timeline so it can easily be copied and shared through messaging apps.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) with App Router
* **Language:** TypeScript
* **AI Integration:** [Google Gemini 2.5 Flash](https://ai.google.dev/)
* **AI SDK:** `@google/genai`
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

---

## 🧠 How the Agentic Workflow Works

Ta-da is designed as an **agentic AI planning workflow**, rather than a simple chatbot.

```text
User's Idea
     ↓
AI Understands the Goal
     ↓
AI Determines Missing Information
     ↓
Dynamic Questions
     ↓
User Answers
     ↓
AI Evaluates Context
     ↓
Enough Information?
   ↙         ↘
 Yes          No
  ↓            ↓
Create Plan   Limited Follow-up
  ↓            ↓
  └──────→ Create Plan
```

The application provides the rails:

* Defined product scope
* Structured inputs and outputs
* Limited follow-up questions
* Controlled workflow transitions
* JSON-based AI responses
* Development mock mode

Within those boundaries, the AI has flexibility to decide what information is important for each individual surprise.

---

## 🏗️ Architecture

```text
┌──────────────────────┐
│      Next.js UI      │
│  React + TypeScript  │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│   Next.js API Routes │
│                      │
│ /api/questions       │
│ /api/create-plan     │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│   Google Gemini      │
│   2.5 Flash          │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│ Structured JSON      │
│ Questions / Plan     │
└──────────────────────┘
```

The Gemini API key remains server-side and is never exposed directly to the browser.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/azeemuddinn/tadaai.git
cd tadaai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
DEBUG_MOCK_AI=false
```

Set `DEBUG_MOCK_AI=true` when you want to test the complete workflow without making Gemini API calls.

### 4. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 💡 Engineering Highlights

### AI with Deterministic Guardrails

Ta-da deliberately does not give the LLM unlimited control over the application flow.

The AI handles decisions such as:

* What information is missing?
* Which questions are useful?
* Is enough context available to create the plan?
* How should the final plan reflect the user's intent?

The application handles:

* Workflow state
* Question limits
* Output structure
* Scope boundaries
* API usage controls
* Final rendering

This creates a balance between **AI flexibility and application reliability**.

### Graceful Development Mode

Gemini API quotas can make rapid UI development difficult.

Ta-da therefore includes a mock AI mode that simulates the AI workflow and network latency, allowing the entire experience to be tested without repeatedly consuming API quota.

### Component State Machine

The frontend manages the user's journey through distinct stages:

```text
Idea
 ↓
Questions
 ↓
Evaluation
 ↓
Ready
 ↓
Plan Generation
 ↓
Final Plan
```

This keeps the user experience predictable while allowing the AI decisions inside the workflow to remain flexible.

---

## 🎯 Project Goal

Ta-da was built as an exploration of how **agentic AI can be applied to a focused consumer experience** without turning the product into a generic chatbot.

The goal is simple:

> Give the AI a goal, give it boundaries, and let it figure out what it needs to accomplish that goal.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
