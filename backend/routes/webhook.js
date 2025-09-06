import express from "express";
import { sendWhatsAppMessage } from "../services/twilio.js";
import { breakTaskIntoSteps } from "../services/gemini.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const TO_NUMBER = process.env.TEST_WHATSAPP_NUMBER; 

// Manual test route
router.get("/test-whatsapp", async (req, res) => {
  await sendWhatsAppMessage(TO_NUMBER, "Hello from TaskMate!");
  res.send("Message sent (check your WhatsApp)");
});

// Twilio webhook route
router.post("/webhook", async (req, res) => {
  const incomingMsg = req.body.Body;

  console.log("Incoming:", incomingMsg);

  if (incomingMsg.toLowerCase().includes("hello")) {
    await sendWhatsAppMessage(TO_NUMBER, "Hi, I’m TaskMate");
  } else {
    await sendWhatsAppMessage(
      TO_NUMBER,
      "TaskMate here! Send 'Hello' to get started."
    );
  }

  res.sendStatus(200);
});

// /task route
router.post("/task", async (req, res) => {
  const incomingMsg = req.body.Body;

  try {
    // Check if user exists, if not create
    let user = await User.findOne({ userId: TO_NUMBER });
    if (!user) {
      user = await User.create({ userId: TO_NUMBER, phone: TO_NUMBER });
    }

    // Generate subtasks via Gemini
    const subtasks = await breakTaskIntoSteps(incomingMsg);

    // Save task in MongoDB
    const task = await Task.create({
      userId: TO_NUMBER,
      text: incomingMsg,
      subtasks,
      status: "pending",
    });

    user.tasks.push(task._id);
    await user.save();

    // Prepare WhatsApp message
    let stepsMessage = subtasks.map((s, i) => `${i + 1}. ${s}`).join("\n");

    if (stepsMessage.length > 1500) {
      stepsMessage = stepsMessage.substring(0, 1500) + "\n... (truncated)";
    }

    // Send WhatsApp to the sandbox number
    await sendWhatsAppMessage(TO_NUMBER, `Here are your steps:\n${stepsMessage}`);

    console.log("Incoming message:", incomingMsg);
    console.log("Generated steps:", subtasks);

    res.sendStatus(200);
  } catch (err) {
    console.error("Error in /task:", err.message);
    res.sendStatus(500);
  }
});

export default router;
