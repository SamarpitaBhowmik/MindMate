import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ Utility function to send WhatsApp message
export const sendWhatsAppMessage = async (to, body) => {
  try {
    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // sandbox number
      to: `whatsapp:${to}`,                      // recipient phone (with country code)
      body
    });
    console.log("✅ WhatsApp message sent:", msg.sid);
  } catch (err) {
    console.error("❌ Error sending WhatsApp:", err.message);
  }
};

// // ✅ Utility function to send SMS
// const sendSMS = async (to, body) => {
//   try {
//     const msg = await client.messages.create({
//       from: process.env.TWILIO_SMS_NUMBER, // your Twilio SMS number
//       to,
//       body
//     });
//     console.log("✅ SMS sent:", msg.sid);
//   } catch (err) {
//     console.error("❌ Error sending SMS:", err.message);
//   }
// };

