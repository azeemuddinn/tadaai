import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Server-level cache state (persists while the server container is warm)
let quotaExhaustedUntil = 0;
const FIFTEEN_HOURS_MS = 15 * 60 * 60 * 1000;

function getMockResponse(occasion: string, answers: any) {
  const isEvaluating = answers && Object.keys(answers).length > 0;

  if (isEvaluating && Object.keys(answers).length >= 2) {
    return { questions: [] };
  }

  return {
    questions: [
      {
        id: "location",
        question: `Where in the city would you like to make this ${occasion.toLowerCase()} happen?`,
        type: "text",
      },
      {
        id: "vibe",
        question:
          "Should it be an intimate private setting or somewhere with a bit of energy?",
        type: "text",
      },
      {
        id: "budget",
        question: "Roughly how much would you like to spend on the surprise?",
        type: "text",
      },
      {
        id: "preferences",
        question:
          "Is there anything they especially love, or anything you definitely want to avoid?",
        type: "text",
      },
    ],
  };
}

export async function POST(req: Request) {
  let occasion = "Celebration";
  let answers = null;

  try {
    const body = await req.json();
    occasion = body.occasion || "Celebration";
    answers = body.answers;
    const idea = body.idea;

    // 1. LOCAL DEBUG FLAG BYPASS
    if (process.env.DEBUG_MOCK_AI === "true") {
      return NextResponse.json(getMockResponse(occasion, answers));
    }

    // 2. 15-HOUR QUOTA PAUSE CHECK
    if (Date.now() < quotaExhaustedUntil) {
      console.log(
        "🛡️ [QUOTA PAUSE] Skipping Gemini due to recent 429 limit. Serving mock data.",
      );
      return NextResponse.json(getMockResponse(occasion, answers));
    }

    // 3. STANDARD GEMINI API FLOW
    const isEvaluating = answers && Object.keys(answers).length > 0;

    const prompt = isEvaluating
      ? `
You are Ta-da, a thoughtful surprise planning assistant.
Occasion: ${occasion}
Initial Idea: "${idea}"
Already Collected Answers: ${JSON.stringify(answers)}

You have already asked questions and received these answers. 
CRITICAL RULE: Be easily satisfied. Do NOT ask more than 1 additional follow-up question, and ONLY ask if something vital (like location or budget) is completely missing. 
If you have enough to build a basic plan, return an empty questions array: {"questions": []}.

Return ONLY valid JSON, no markdown:
{
  "questions": [
    {
      "id": "unique_field_name",
      "question": "One final question if absolutely necessary",
      "type": "text"
    }
  ]
}
`
      : `
You are Ta-da, a thoughtful surprise planning assistant.
Occasion: ${occasion}
Idea: "${idea}"

Analyze the idea and dynamically decide how many concise questions are needed to gather any missing vital info. 
Return ONLY valid JSON with this exact structure, no markdown:
{
  "questions": [
    {
      "id": "unique_field_name",
      "question": "Natural question for the user",
      "type": "text"
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "{}";
    const cleanJson = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error: any) {
    console.error("⚠️ Gemini API error:", error);

    // If quota is exceeded (429), lock out Gemini calls for 15 hours
    if (
      error?.status === "RESOURCE_EXHAUSTED" ||
      error?.message?.includes("429")
    ) {
      quotaExhaustedUntil = Date.now() + FIFTEEN_HOURS_MS;
      console.log(`🛑 Quota hit! Pausing Gemini calls for 15 hours.`);
    }

    return NextResponse.json(getMockResponse(occasion, answers));
  }
}