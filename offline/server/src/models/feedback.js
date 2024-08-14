import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  businessId: { type: String, required: true }, // Ensure businessId is required
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
