// import express from "express";
// import { sendWhatsAppMessage } from "../services/twilio.js";
// import { breakTaskIntoSteps } from "../services/gemini.js";
// import User from "../models/User.js";
// import Task from "../models/Task.js";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();

// const TO_NUMBER = process.env.TEST_WHATSAPP_NUMBER; 

// // Manual test route
// router.get("/test-whatsapp", async (req, res) => {
//   await sendWhatsAppMessage(TO_NUMBER, "Hello from TaskMate!");
//   res.send("Message sent (check your WhatsApp)");
// });

// // Twilio webhook route
// router.post("/webhook", async (req, res) => {
//   const incomingMsg = req.body.Body;

//   console.log("Incoming:", incomingMsg);

//   if (incomingMsg.toLowerCase().includes("hello")) {
//     await sendWhatsAppMessage(TO_NUMBER, "Hi, I’m TaskMate");
//   } else {
//     await sendWhatsAppMessage(
//       TO_NUMBER,
//       "TaskMate here! Send 'Hello' to get started."
//     );
//   }

//   res.sendStatus(200);
// });

// // /task route
// router.post("/task", async (req, res) => {
//   const incomingMsg = req.body.Body;

//   try {
//     // Check if user exists, if not create
//     let user = await User.findOne({ userId: TO_NUMBER });
//     if (!user) {
//       user = await User.create({ userId: TO_NUMBER, phone: TO_NUMBER });
//     }

//     // Generate subtasks via Gemini
//     const subtasks = await breakTaskIntoSteps(incomingMsg);

//     // Save task in MongoDB
//     const task = await Task.create({
//       userId: TO_NUMBER,
//       text: incomingMsg,
//       subtasks,
//       status: "pending",
//     });

//     user.tasks.push(task._id);
//     await user.save();

//     // Prepare WhatsApp message
//     let stepsMessage = subtasks.map((s, i) => `${i + 1}. ${s}`).join("\n");

//     if (stepsMessage.length > 1500) {
//       stepsMessage = stepsMessage.substring(0, 1500) + "\n... (truncated)";
//     }

//     // Send WhatsApp to the sandbox number
//     await sendWhatsAppMessage(TO_NUMBER, `Here are your steps:\n${stepsMessage}`);

//     console.log("Incoming message:", incomingMsg);
//     console.log("Generated steps:", subtasks);

//     res.sendStatus(200);
//   } catch (err) {
//     console.error("Error in /task:", err.message);
//     res.sendStatus(500);
//   }
// });

// export default router;


import express from "express";
import { sendWhatsAppMessage } from "../services/twilio.js";
import { breakTaskIntoSteps } from "../services/gemini.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const TO_NUMBER = process.env.TEST_WHATSAPP_NUMBER;

// Manual test 
router.get("/test-whatsapp", async (req, res) => {
  await sendWhatsAppMessage(TO_NUMBER, "Hello from TaskMate!");
  res.send("Message sent (check WhatsApp)");
});

// Webhook for WhatsApp 
router.post("/webhook", async (req, res) => {
  const incomingMsg = req.body.Body.trim();
  console.log("Incoming message:", incomingMsg);

  try {
    // Handle greeting
    if (incomingMsg.toLowerCase() === "hello") {
      await sendWhatsAppMessage(TO_NUMBER, "Hi, I’m TaskMate! Send me your task.");
      return res.sendStatus(200);
    }

    // Handle marking a task as completed
    if (incomingMsg.toLowerCase().startsWith("done")) {
      const task = await Task.findOne({ userId: TO_NUMBER, status: "pending" }).sort({ createdAt: -1 });
      if (task) {
        task.status = "completed";
        await task.save();
        await sendWhatsAppMessage(TO_NUMBER, `Task "${task.text}" marked as completed!`);
      } else {
        await sendWhatsAppMessage(TO_NUMBER, "No pending tasks found.");
      }
      return res.sendStatus(200);
    }

    // Create new task
    let user = await User.findOne({ userId: TO_NUMBER });
    if (!user) {
      user = await User.create({ userId: TO_NUMBER, phone: TO_NUMBER });
    }

    // Break task into steps using Gemini
    const subtasks = await breakTaskIntoSteps(incomingMsg);

    const dueDate = new Date(Date.now() + 1 * 60 * 1000);

    const task = await Task.create({
      userId: TO_NUMBER,
      text: incomingMsg,
      subtasks,
      status: "pending",
      dueDate,
      notified: false,
      voiceCalled: false
    });

    user.tasks.push(task._id);
    await user.save();

    // Prepare WhatsApp message
    let stepsMessage = subtasks.map((s, i) => `${i + 1}. ${s}`).join("\n");
    if (stepsMessage.length > 1500) {
      stepsMessage = stepsMessage.substring(0, 1500) + "\n... (truncated)";
    }

    await sendWhatsAppMessage(TO_NUMBER, `Here are your steps for "${incomingMsg}":\n${stepsMessage}\n\nSend "done" when completed.`);

    res.sendStatus(200);
  } catch (err) {
    console.error("Error in /webhook:", err.message);
    res.sendStatus(500);
  }
});

router.post("/whatsapp", async (req, res) => {
  const incomingMsg = req.body.Body?.trim().toLowerCase();
  const from = req.body.From; // WhatsApp sender number

  try {
    if (incomingMsg === "done") {
      const task = await Task.findOne({ userId: from, status: "pending" });

      if (task) {
        if (task.currentStep < task.subtasks.length - 1) {
          task.currentStep += 1;
          task.notified = false; // reset so reminder triggers again
          await task.save();

          await sendWhatsAppMessage(
            from,
            `🎉 Great job! Next step: ${task.subtasks[task.currentStep]}`
          );
        } else {
          // All subtasks done → mark task completed
          task.status = "completed";
          await task.save();

          await sendWhatsAppMessage(from, `Task "${task.text}" fully completed! 🎉`);
        }
      } else {
        await sendWhatsAppMessage(from, "No active task found to mark as done.");
      }
    }
    res.send("OK");
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).send("Error");
  }
});


export default router;
