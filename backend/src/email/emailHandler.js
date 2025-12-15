import nodemailer from "nodemailer";
import { ENV } from "../lib/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"AlgoMeet" <${ENV.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
