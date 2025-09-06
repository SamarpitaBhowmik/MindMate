import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const breakTaskIntoSteps = async (taskText) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Break this task into 3–4 ADHD-friendly steps: "${taskText}"`,
    });

    const steps = response.text
      .split("\n")
      .map((step) => step.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    return steps;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return ["Unable to generate steps at this time."];
  }
};
