import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 5174;

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

app.post("/api/contact", async (req, res) => {
  const { name, email, company, phone, message, website } = req.body || {};

  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const transporter = getTransporter();
  if (!transporter) {
    return res.status(500).json({ message: "Email service not configured." });
  }

  const toAddress = process.env.SMTP_TO || "contact@synfiniconstruction.org";
  const fromAddress = process.env.SMTP_FROM || "Synfiny Construction <contact@synfiniconstruction.org>";

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New Synfiny Construction inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || ""}\nPhone: ${phone || ""}\n\nMessage:\n${message}`
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send failed:", error?.message || error);
    return res.status(500).json({ message: "Failed to send message." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
