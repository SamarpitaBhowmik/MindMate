import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const breakTaskIntoSteps = async (taskText) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Break this task into 3–4 ADHD-friendly steps. Keep each step very short (under 15 words). Task: "${taskText}"`,
    });

    let text = response.text;

    // Remove excessive whitespace and long lines
    text = text.replace(/\s+/g, " ").trim();

    const steps = text
      .split(/\d+\.\s|[\n\r]+/)
      .map((step) => step.trim())
      .filter(Boolean)
      .slice(0, 4); 

    return steps;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return ["Unable to generate steps at this time."];
  }
};
