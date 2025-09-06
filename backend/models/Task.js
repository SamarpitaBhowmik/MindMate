import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // link to User.userId (Twilio number)
  text: { type: String, required: true },   // original task input
  subtasks: [{ type: String }],             // GPT will generate these
  status: { 
    type: String, 
    enum: ["pending", "in-progress", "completed"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
