import express from "express";
import { sendWhatsAppMessage } from "../services/twilio.js"; // adjust if your utils path differs
import { breakTaskIntoSteps } from "../services/gemini.js";
import User from "../models/User.js";
import Task from "../models/Task.js";


const router = express.Router();

// ✅ Manual test route
router.get("/test-whatsapp", async (req, res) => {
  await sendWhatsAppMessage("whatsapp:+918777679460", "Hello 👋 from TaskMate!");
  res.send("Message sent (check your WhatsApp)");
});

// ✅ Twilio webhook route
router.post("/webhook", async (req, res) => {
  const incomingMsg = req.body.Body;   // user's text
  const from = req.body.From;          // user's number

  console.log("📩 Incoming:", incomingMsg, "from", from);

  if (incomingMsg.toLowerCase().includes("hello")) {
    await sendWhatsAppMessage(from, "Hi, I’m TaskMate 👋");
  } else {
    await sendWhatsAppMessage(from, "TaskMate here! Send 'Hello' to get started.");
  }

  // Twilio requires a response (empty 200 is fine since we reply via API)
  res.sendStatus(200);
});

router.post("/task", async (req, res) => {
  const from = req.body.From;           // user's WhatsApp number
  const incomingMsg = req.body.Body;    // task text

  try {
    // 1️⃣ Check if user exists, if not create
    let user = await User.findOne({ userId: from });
    if (!user) {
      user = await User.create({ userId: from, phone: from });
    }

    // 2️⃣ Generate subtasks via Gemini
    const subtasks = await breakTaskIntoSteps(incomingMsg);

    // 3️⃣ Save task in MongoDB
    const task = await Task.create({
      userId: from,
      text: incomingMsg,
      subtasks,
      status: "pending",
    });

    user.tasks.push(task._id);
    await user.save();

    // 4️⃣ Reply to user via WhatsApp
    const stepsMessage = subtasks.map((s, i) => `${i + 1}. ${s}`).join("\n");
    await sendWhatsAppMessage(from, `Here are your steps:\n${stepsMessage}`);

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error in /task:", err.message);
    res.sendStatus(500);
  }
});


export default router;
