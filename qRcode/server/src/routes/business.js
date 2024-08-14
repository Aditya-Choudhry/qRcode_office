import express from 'express';
import Business from '../models/Business.js';
 
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { businessLogo, banner, businessName, businessAddress, businessType, defaultLanguage, url, ownerid } = req.body;
 
    const newBusiness = new Business({
      businessLogo,
      banner,
      businessName,
      businessAddress,
      businessType,
      defaultLanguage,
      url,
      ownerid
    });
 
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    console.error('Error saving business:', error);
    res.status(500).json({ error: 'Failed to save business data' });
  }
});
 
router.get('/all', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    console.error('Error fetching all businesses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
 
router.get('/user/:id', async (req, res) => {
  try {
    const businesses = await Business.find({ ownerid: req.params.id });
    res.status(200).json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error('Error fetching business:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const { businessLogo, banner, businessName, businessAddress, businessType, defaultLanguage, url, ownerid } = req.body;
 
   
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      {
        businessLogo,
        banner,      
        businessName,
        businessAddress,
        businessType,
        defaultLanguage,
        url,
        ownerid
      },
      { new: true }
    );
 
    if (!updatedBusiness) {
      return res.status(404).json({ error: 'Business not found' });
    }
 
    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(400).json({ error: error.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.status(200).json({ message: 'Business deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 
export default router;
 