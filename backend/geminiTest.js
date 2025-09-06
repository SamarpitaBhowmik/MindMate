import { breakTaskIntoSteps } from "./services/gemini.js";

const test = async () => {
  const taskText = "Help me plan a study session for 30 minutes";

  try {
    const steps = await breakTaskIntoSteps(taskText);
    console.log("Task breakdown:", steps);
  } catch (err) {
    if (err.response?.status === 429) {
      console.error("Quota exceeded. Please check your Gemini plan.");
    } else {
      console.error("Error:", err.message);
    }
  }
};

test();
