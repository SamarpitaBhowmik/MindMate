import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Twilio "From" field
  phone: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  preferences: {
    voice: { type: Boolean, default: false } // true = wants voice reminders
  }
});

const User = mongoose.model("User", userSchema);

export default User;
