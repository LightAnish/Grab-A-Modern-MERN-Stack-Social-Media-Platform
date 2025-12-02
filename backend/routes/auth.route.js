import express from 'express';
import { Login, logout, register, sendOtp, verifyOtp, forgotPassword } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', Login);
authRouter.get('/logout', logout);
authRouter.post('/send-otp', sendOtp);
authRouter.post('/verify-otp', verifyOtp);
authRouter.post('/forgot-password', forgotPassword);

export default authRouter;