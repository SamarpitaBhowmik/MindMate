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

      console.log(`Found ${tasks.length} tasks due for reminder at ${now}`);

      for (const task of tasks) {
        const userNumber = task.userId; // WhatsApp number saved as userId
        console.log("Sending reminder to:", userNumber);

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
          console.log(`WhatsApp reminder sent for task: "${task.text}"`);
          continue;
        }

      }
    } catch (err) {
      console.error("Error in reminders cron:", err.message);
    }
  });

  console.log("Reminder service started");
};
