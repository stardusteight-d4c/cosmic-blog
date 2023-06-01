import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const pass = process.env.TWO_STEP_VERIF_PASS;

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.ethereal.email",
  auth: {
    user: "stardusteight.d4cc@gmail.com",
    pass, // get in google Two-step verification
  },
});
