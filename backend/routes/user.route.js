import express from 'express';
import isLogin from '../middleware/isLogin.middleware.js';
import { getUserProfile } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.get('/getprofile',isLogin, getUserProfile)

export default userRouter;