import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { idea, occasion, answers } = await req.json();

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

Analyze the idea and generate at most 3 concise questions for missing vital info. 
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
    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in AI evaluation:", error);
    return NextResponse.json({ questions: [] });
  }
}
