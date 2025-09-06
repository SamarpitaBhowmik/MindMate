import express from 'express';
import { sendWhatsAppMessage } from '../services/twilio.js';

const router = express.Router();

router.get('/test-whatsapp', async (req, res) => {
  await sendWhatsAppMessage('+916291504575', 'Hello 👋 from TaskMate!');
  res.send('Message sent (check your WhatsApp)');
});

export default router;
