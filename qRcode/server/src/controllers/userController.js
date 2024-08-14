import User from '../models/User.js';

export const updateUserSubscription = async (req, res) => {
  try {
    const { userId, email, subscriptionId } = req.body;

    if ((!userId && !email) || !subscriptionId) {
      return res.status(400).json({ error: 'User ID or Email and Subscription ID are required' });
    }

    const user = userId ? await User.findById(userId) : await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.subscriptionId = subscriptionId;
    user.subscribe = true; 
    await user.save();

    res.status(200).json({ message: 'Subscription updated successfully', subscribed: user.subscribe });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
