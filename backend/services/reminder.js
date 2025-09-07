// import cron from "node-cron";
// import Task from "../models/Task.js";
// import User from "../models/User.js";
// import { sendWhatsAppMessage } from "./twilio.js";
// import twilio from "twilio";
// import dotenv from "dotenv";
// dotenv.config();

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export const startTaskReminders = () => {
//   // Runs every minute
//   cron.schedule("* * * * *", async () => {
//     try {
//       const now = new Date();

//       // 1️⃣ Find pending tasks where dueDate <= now
//       const tasks = await Task.find({
//         status: "pending",
//         dueDate: { $lte: now },
//       }).populate("userId");

//       for (const task of tasks) {
//         const userNumber = task.userId.phone; // WhatsApp number

//         // 2️⃣ Send WhatsApp if not notified
//         if (!task.notified) {
//           const stepText = task.subtasks.length > 0 ? task.subtasks[0] : task.text;
//           await sendWhatsAppMessage(userNumber, `⏰ Time for Step: ${stepText}`);
//           task.notified = true;
//           await task.save();
//           console.log(`✅ WhatsApp reminder sent for task: "${task.text}"`);
//           continue; // wait for next cron run for voice fallback
//         }

//         // 3️⃣ Voice fallback after 5 minutes if WhatsApp not responded
//         const fiveMinutes = 5 * 60 * 1000; // 5 min in ms
//         if (!task.voiceCalled && now - task.dueDate >= fiveMinutes) {
//           await twilioClient.calls.create({
//             twiml: `<Response><Say voice="alice">Hey, don’t forget your study session. You got this!</Say></Response>`,
//             to: userNumber.replace("whatsapp:", ""), // must be a phone number, no whatsapp prefix
//             from: process.env.TWILIO_WHATSAPP_NUMBER.replace("whatsapp:", ""), // Twilio number for calls
//           });

//           task.voiceCalled = true;
//           await task.save();
//           console.log(`📞 Voice call made for task: "${task.text}"`);
//         }
//       }

//       console.log("Reminder Services Started");
//     } catch (err) {
//       console.error("❌ Error in reminders cron:", err.message);
//     }
//   });
// };

import cron from "node-cron";
import Task from "../models/Task.js";
import twilio from "twilio";
import { sendWhatsAppMessage } from "./twilio.js";
import dotenv from "dotenv";
dotenv.config();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const startTaskReminders = () => {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Find pending tasks where dueDate <= now
      const tasks = await Task.find({
        status: "pending",
        dueDate: { $lte: now },
      });

      for (const task of tasks) {
        const userNumber = task.userId; // WhatsApp number saved as userId

        // WhatsApp reminder if not notified
        if (!task.notified) {
          const stepText =
            task.subtasks.length > 0
              ? task.subtasks[task.currentStep] 
              : task.text;
          await sendWhatsAppMessage(
            userNumber,
            `⏰ Reminder: Time for Step: ${stepText}`
          );
          task.notified = true;
          await task.save();
          console.log(`✅ WhatsApp reminder sent for task: "${task.text}"`);
          continue; 
        }

        // Voice fallback after 5 minutes if task still not completed
        const fiveMinutes = 2 * 60 * 1000;
        if (!task.voiceCalled && now - task.dueDate >= fiveMinutes) {
          await twilioClient.calls.create({
            twiml: `<Response><Say voice="alice">Hey, don’t forget your task: ${task.text}. You got this!</Say></Response>`,
            to: userNumber.replace("whatsapp:", ""),
            from: process.env.TWILIO_CALL_NUMBER,
          });

          task.voiceCalled = true;
          await task.save();
          console.log(`Voice call made for task: "${task.text}"`);
        }
      }
    } catch (err) {
      console.error("Error in reminders cron:", err.message);
    }
  });

  console.log("Reminder service started");
};
