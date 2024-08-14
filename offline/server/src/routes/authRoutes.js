import express from 'express';
import {signup, login} from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', requireAuth, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});
router.get('/check', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user) {
      res.json({ isAdmin: user.isAdmin });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
export default router;
