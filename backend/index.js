import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connect.db.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
dotenv.config();
connectDB()
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes );
app.use('/api/user', userRoutes );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
