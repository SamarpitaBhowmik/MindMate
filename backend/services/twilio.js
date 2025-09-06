import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppMessage = async (to, body) => {
  try {
    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, 
      to: to,                                   
      body
    });
    console.log("WhatsApp message sent:", msg.sid);
  } catch (err) {
    console.error("Error sending WhatsApp:", err.message);
  }
};
