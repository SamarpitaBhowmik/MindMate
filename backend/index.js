import express from 'express';
import connectDB from './utils/db.js';
import webhookRoutes from './routes/webhook.js';
import { startTaskReminders } from "./services/reminder.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Database 
connectDB();

// Start reminders cron 
startTaskReminders();

// Routes 
app.get('/', (req, res) => {
  res.send('TaskMate Backend is running');
});

app.use('/api', webhookRoutes);  


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
