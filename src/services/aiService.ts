import { GoogleGenAI } from "@google/genai";
import { pastWeeks, currentWeek } from "../data/mockData";

export async function generateWeeklyReviewInsights() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `
You are an AI accountability partner and coach for a user doing their weekly review.
Your goal is not just to summarize, but to identify patterns across weeks, challenge the user on stale goals, and generate one concrete nudge for the upcoming week.

Here is the data for the past 3 weeks:
${JSON.stringify(pastWeeks, null, 2)}

Here is the data for the current week they are reviewing:
${JSON.stringify(currentWeek, null, 2)}

Based on this data, provide a coaching reflection. Structure your response in Markdown with the following sections:
1. **The Pattern**: Identify a recurring theme or pattern across the weeks (e.g., energy dips, recurring wins, consistent blockers).
2. **The Challenge**: Point out a specific goal that has been stale or a concern that hasn't been addressed. Ask them directly: "Keep, modify, or drop?"
3. **The Nudge**: Give one very specific, actionable piece of advice or task for the upcoming week based on your observations.

Keep your tone direct, supportive, but firm. You are a coach, not a cheerleader. Be concise.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insights:", error);
    return "I'm sorry, I couldn't generate your review insights at this time. Please try again later.";
  }
}
