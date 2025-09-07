import express from "express";
import { sendWhatsAppMessage } from "../services/twilio.js";
import { breakTaskIntoSteps } from "../services/gemini.js";
import { awardXP } from "../utils/gamification.js";   // XP + streak
import User from "../models/User.js";
import Task from "../models/Task.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const TO_NUMBER = process.env.TEST_WHATSAPP_NUMBER;

// Manual test 
router.get("/test-whatsapp", async (req, res) => {
  await sendWhatsAppMessage(TO_NUMBER, "Hello from MindMate!");
  res.send("Message sent (check WhatsApp)");
});

// Webhook for WhatsApp 
router.post("/webhook", async (req, res) => {
  const incomingMsg = req.body.Body?.trim();
  const from = req.body.From || TO_NUMBER; 
  console.log("Incoming message:", incomingMsg);

  try {
    // Greeting
    if (incomingMsg.toLowerCase() === "hello") {
      await sendWhatsAppMessage(from, "Hi, I’m MindMate! Your AI friend.. Send me your task.");
      return res.sendStatus(200);
    }

    // Mark task/subtask as done
    if (incomingMsg.toLowerCase().startsWith("done")) {
      const task = await Task.findOne({ userId: from, status: "pending" }).sort({ createdAt: -1 });

      if (task) {
        if (task.currentStep < task.subtasks.length - 1) {
          // Move to next subtask
          task.currentStep += 1;
          task.notified = false; 
          await task.save();

          // Award XP for subtask
          const { xp, streak } = await awardXP(from);

          await sendWhatsAppMessage(
            from,
            `🎉 Great job! Step ${task.currentStep} completed.\n` +
            `Next: ${task.subtasks[task.currentStep]}\n\n` +
            `+10 XP earned. Total XP: ${xp}\n🔥 Streak: ${streak} day(s)`
          );
        } else {
          // All subtasks done → mark task completed
          task.status = "completed";
          await task.save();

          const { xp, streak } = await awardXP(from);

          await sendWhatsAppMessage(
            from,
            `🎉 Task "${task.text}" fully completed!\n\n` +
            `+10 XP earned. Total XP: ${xp}\n🔥 Streak: ${streak} day(s)`
          );
        }
      } else {
        await sendWhatsAppMessage(from, "No active task found to mark as done.");
      }
      return res.sendStatus(200);
    }

    // Create a new task
    let user = await User.findOne({ userId: from });
    if (!user) {
      user = await User.create({ userId: from, phone: from });
    }

    const subtasks = await breakTaskIntoSteps(incomingMsg);
    const dueDate = new Date(Date.now() + 1 * 60 * 1000); 

    const task = await Task.create({
      userId: from,
      text: incomingMsg,
      subtasks,
      currentStep: 0,
      status: "pending",
      dueDate,
      notified: false,
      voiceCalled: false,
    });

    user.tasks.push(task._id);
    await user.save();

    let stepsMessage = subtasks.map((s, i) => `${i + 1}. ${s}`).join("\n");
    if (stepsMessage.length > 1500) {
      stepsMessage = stepsMessage.substring(0, 1500) + "\n... (truncated)";
    }

    await sendWhatsAppMessage(
      from,
      `Here are your steps for "${incomingMsg}":\n${stepsMessage}\n\nSend "done" when you finish each step.`
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Error in /webhook:", err.message);
    res.sendStatus(500);
  }
});

export default router;
