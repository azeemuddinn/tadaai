import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { idea, occasion, questions, answers } = await req.json();

    // 1. LOCAL DEBUG FLAG BYPASS
    if (process.env.DEBUG_MOCK_AI === "true") {
      console.log("🛠️️ [DEBUG MODE] Bypassing Gemini API for final plan.");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const city = answers?.location || "Your City";
      const budget = answers?.budget || "Flexible";
      const cake = answers?.cake || "a custom favourite cake";

      return NextResponse.json({
        title: `A Heartfelt ${occasion} Celebration`,
        occasion: occasion,
        city: city,
        budget: budget,
        total: budget,
        items: [
          [
            "4:00 PM",
            "The Prelude",
            `Setting the stage in ${city} with careful pacing that matches the ${answers?.vibe || "intimate"} mood you wanted.`,
          ],
          [
            "6:30 PM",
            "The Reveal & Cake Moment",
            `Unveiling the surprise moment, highlighted by bringing out ${cake} just at the right time.`,
          ],
          [
            "8:30 PM",
            "Evening Wind-down",
            "A relaxed conclusion focused entirely on quality time and celebrating the occasion.",
          ],
        ],
      });
    }

    // 2. STANDARD GEMINI API FLOW WITH YOUR REFINED PROMPT
    const prompt = `
You are Ta-da, a thoughtful surprise planning assistant.

The user has completed the information-gathering phase. You now have enough information to create the final surprise plan.

Using ALL of the information below, create a realistic, personalized and emotionally thoughtful surprise plan.

IMPORTANT RULES:
- Do NOT ask any questions.
- The plan must clearly reflect the user's original idea and answers.
- Do not ignore specific preferences, constraints, budget, location, timing, or details provided by the user (such as cake choices, specific likes/dislikes).
- Do not invent specific venues, restaurants, businesses, prices, or bookings unless the user explicitly provided them.
- If a minor detail is missing, make a sensible general assumption.
- Keep the plan realistic and achievable within the stated budget.
- The plan should feel personal and intentional, not like a generic template.
- Create a natural sequence where each step leads into the next.
- Prioritize the emotional intent behind the surprise, not just the logistics.

Original Idea:
"${idea}"

Occasion:
"${occasion}"

Questions Asked:
${JSON.stringify(questions)}

Answers Provided:
${JSON.stringify(answers)}

Return ONLY valid JSON with this exact structure. Do not include markdown, explanations, or code fences:

{
  "title": "A memorable title for the surprise plan",
  "occasion": "${occasion}",
  "city": "Extracted or inferred city/location",
  "budget": "Extracted or inferred budget",
  "total": "Estimated total cost, for example ₹18,500",
  "items": [
    [
      "Time slot, for example 5:30 PM",
      "Milestone title",
      "Detailed description of what happens"
    ],
    [
      "Time slot, for example 7:30 PM",
      "Milestone title",
      "Detailed description of what happens"
    ],
    [
      "Time slot, for example 9:30 PM",
      "Milestone title",
      "Detailed description of what happens"
    ]
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

    const planData = JSON.parse(cleanJson);

    return NextResponse.json(planData);
  } catch (error) {
    console.error("Error in creating final plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan. Please try again." },
      { status: 500 },
    );
  }
}
