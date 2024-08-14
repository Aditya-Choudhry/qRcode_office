import Subscription from '../models/subscriptionModel.js';
 
export const subscribe = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
   
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
};