import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  subtasks: [{ type: String }],
  currentStep: { type: Number, default: 0 }, // field to track which subtask is active
  status: { type: String, default: "pending" }, 
  dueDate: { type: Date }, 
  notified: { type: Boolean, default: false }, 
  voiceCalled: { type: Boolean, default: false }, 
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
