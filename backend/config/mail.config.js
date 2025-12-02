import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpMail = async (email, otp) => {
     await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP for Grab",
        text: `Your Forget Password OTP for Grab is ${otp} . Please enter this OTP to reset your password. If you did not request for password reset, please ignore this email. Never Share your OTP with anyone.`,
    })
}

export default sendOtpMail;