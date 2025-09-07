// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // WhatsApp number or unique ID
  phone: { type: String },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],

 
  xp: { type: Number, default: 0 },          
  streak: { type: Number, default: 0 },      
  lastCompletedDate: { type: Date },         
});

const User = mongoose.model("User", userSchema);

export default User;
