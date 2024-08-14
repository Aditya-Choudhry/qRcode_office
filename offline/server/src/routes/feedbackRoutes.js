import express from 'express';
import Feedback from '../models/feedback.js'

const router = express.Router();
router.get('/allfeedbacks', async (req, res) => {
    try {
        // Fetch all feedbacks from the database
        const feedbacks = await Feedback.find();

        // Respond with the feedbacks
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: 'Failed to fetch feedbacks. Please try again later.' });
    }
});

// Route to handle form submissions
router.post('/feedback', async (req, res) => {
    console.log("reached here")
  try {
    const { feedback, name, email, phone } = req.body;
    console.log("yes get the data")

    // Retrieve businessId from the request headers
    const businessId = req.headers['business-id']; // Or however you're sending it

    // Validate the businessId
    if (!businessId) {
      return res.status(400).json({ message: 'Business ID is required' });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({
      feedback,
      name,
      email,
      phone,
      businessId,
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback. Please try again later.' });
  }
});


export default router;
