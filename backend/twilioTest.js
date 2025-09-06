import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendTestMessage() {
  try {
    const msg = await client.messages.create({
      from: "whatsapp:+XXXXXX", 
      to: "whatsapp:+91XXXXXX",  
      body: "Twilio WhatsApp test message working!"
    });

    console.log("Message sent successfully!");
    console.log("SID:", msg.sid);
  } catch (err) {
    console.error("Error sending WhatsApp:", err.message);
  }
}

sendTestMessage();
