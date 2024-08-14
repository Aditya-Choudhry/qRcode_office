import express from 'express';
import User from '../models/User.js'; 
const router = express.Router();
router.post('/subscribe', async (req, res) => {
  const { userId, subscriptionId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.subscribe = true;
    user.subscriptionType = subscriptionId; 
    await user.save();
    res.json({ subscribed: true });
  } catch (error) {
    console.error('Error subscribing user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/check-subscription', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      isSubscribed: user.subscribe,
      subscriptionType: user.subscriptionType 
    });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;