import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  planId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
