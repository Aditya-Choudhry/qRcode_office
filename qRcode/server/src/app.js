import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import businessRoutes from './routes/business.js';
import contactRoute from "./routes/contact-router.js";
import subscriptionRoute from "./routes/subscription-router.js";
import generateRoutes from './routes/generate-router.js';
import dotenv from 'dotenv';
import userRoutes from './routes/User.js'
import keywordRoutes from './routes/keyword.js'
import formRoutes from './routes/formRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use('/api/auth', authRoutes);
app.use("/api/form", formRoutes);
app.use('/api/business', businessRoutes);
app.use('/api', subscriptionRoute);
app.use('/api/user', userRoutes);
app.use('/review', generateRoutes);
app.use('/apii/' , keywordRoutes);
app.use('/api',contactRoute);
app.use('/api',feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });