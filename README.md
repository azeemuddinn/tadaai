# Ta-da 🎉

An agentic AI powered surprise planning web application that helps users turn a simple idea into a personalized surprise plan.

Built with **Next.js**, **Google Gemini 2.5 Flash**, and **Tailwind CSS**.

---

## 🌟 Overview

Planning a memorable surprise for a birthday, anniversary, proposal, date night, or milestone can take a lot of planning.

**Ta-da** starts with a simple idea.

Instead of asking every user the same set of questions, the AI looks at what the user has already shared, identifies what information is missing, asks relevant questions, checks whether it has enough information, and then creates a personalized surprise plan.

The basic flow is:

**Tell → Ask → Understand → Plan**

---

## ✨ Key Features

* **Agentic Workflow Architecture**
  Uses AI for flexible decision making while keeping the overall workflow controlled by the application.

* **Dynamic Question Generation**
  Questions are generated based on the user's initial idea instead of using the same fixed questionnaire every time.

* **Context Evaluation**
  After collecting answers, the AI checks whether there is enough information to create a useful plan. A limited follow up question can be asked when an important detail is missing.

* **Personalized Surprise Plans**
  Generates structured, time based plans using information such as the occasion, idea, preferences, location, and budget.

* **Development Mock Mode**
  Includes a mock AI mode for testing the complete workflow without consuming Gemini API quota during development.

* **Usage Guardrails**
  Limits unnecessary AI calls and prevents the question flow from continuing indefinitely.

* **Print and PDF Export**
  Provides a print friendly version of the final plan that can be saved as a PDF or printed.

* **Instant Sharing**
  Makes it easy to copy the generated timeline and share it through messaging apps.

---

## 🛠️ Tech Stack

* **Framework:** Next.js with App Router
* **Language:** TypeScript
* **AI:** Google Gemini 2.5 Flash
* **AI SDK:** `@google/genai`
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

---

## 🧠 How the Agentic Workflow Works

Ta-da is built as an agentic AI planning workflow rather than a simple chatbot.

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
AI Checks the Context
     ↓
Enough Information?
   ↙         ↘
 Yes          No
  ↓            ↓
Create Plan   Follow Up
  ↓            ↓
  └──────→ Create Plan
```

The application controls the main workflow:

* Product scope
* Input and output structure
* Question limits
* Workflow transitions
* JSON responses
* Development mock mode

The AI decides what information is important for the specific surprise.

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
│    Structured JSON   │
│   Questions / Plan   │
└──────────────────────┘
```

The Gemini API key stays on the server and is not exposed to the browser.

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

Set `DEBUG_MOCK_AI=true` when you want to test the workflow without making Gemini API calls.

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

### AI with Application Guardrails

The AI does not control the entire application.

The AI handles things such as:

* What information is missing
* Which questions are useful
* Whether enough context is available
* How the final plan should reflect the user's idea

The application handles:

* Workflow state
* Question limits
* Output structure
* Scope
* API usage
* Final rendering

This keeps the AI flexible while keeping the application predictable.

### Development Mock Mode

Gemini API quotas can make development and UI testing difficult.

Ta-da includes a mock AI mode that simulates the workflow and network delay. This makes it possible to test the complete experience without using Gemini API quota.

### Frontend State Flow

The frontend moves through a small number of defined stages:

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

This keeps the UI predictable while the AI decides what questions are needed.

---

## 🎯 Project Goal

Ta-da was built to explore how agentic AI can be used for a focused consumer experience instead of building another general purpose chatbot.

The idea is simple:

> Give the AI a goal, give it boundaries, and let it figure out what information it needs to complete the goal.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
