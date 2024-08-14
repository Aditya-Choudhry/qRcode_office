import express from 'express';
import Business from '../models/Business.js';
import Keyword from '../models/Keyword.js';
const router = express.Router();
router.get('/business/:businessId', async (req, res) => {
  const { businessId } = req.params;
  console.log(`Received request to fetch business with ID: ${businessId}`); 
  try {
    if (!businessId) {
      console.error('No businessId provided'); 
      return res.status(400).json({ message: 'Business ID is required' });
    }
    console.log('Request parameters:', req.params);
    const business = await Business.findById(businessId);
    if (business) {
      console.log('Business found:', business); 
      res.json(business);
    } else {
      console.warn('Business not found for ID:', businessId); 
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    console.error('Error fetching business details:', error); 
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/keywords', async (req, res) => {
  const { businessId } = req.query;
  console.log(`Received request to fetch keywords for business ID: ${businessId}`); 
  try {
    if (!businessId) {
      console.error('No businessId provided'); 
      return res.status(400).json({ message: 'Business ID is required' });
    }
    const keywords = await Keyword.find({ businessId });
    if (keywords.length > 0) {
      console.log('Keywords found:', keywords); 
      console.log(keywords);
      res.json(keywords);
    } else {
      console.warn('No keywords found for business ID:', businessId); 
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching keywords:', error); 
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;