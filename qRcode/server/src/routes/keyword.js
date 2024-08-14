import express from 'express';
import Keyword from '../models/Keyword.js';
const router = express.Router();
router.get('/keywords/:id', async (req, res) => {
  try {
    const { businessId } = req.query;
    const query = businessId ? { businessId } : {};
    const keywords = await Keyword.find(query);
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/keywords', async (req, res) => {
  try {
    const { businessId } = req.query;
    const query = businessId ? { businessId } : {};
    const keywords = await Keyword.find(query);
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/keywords', async (req, res) => {
  const { keyword, language, businessId, ownerId } = req.body;
  try {
    const newKeyword = new Keyword({ keyword, language, businessId, ownerId });
    await newKeyword.save();
    res.status(201).json(newKeyword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/keywords/:id', async (req, res) => {
  const { id } = req.params;
  const { keyword, language, businessId, ownerId } = req.body;
  console.log('sadashdas')
  try {
    const updatedKeyword = await Keyword.findByIdAndUpdate(id, {
      keyword,
      language,
      businessId,
      ownerId
    }, { new: true });
    if (!updatedKeyword) return res.status(404).json({ message: 'Keyword not found' });
    res.json(updatedKeyword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete('/keywords/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedKeyword = await Keyword.findByIdAndDelete(id);
    if (!deletedKeyword) return res.status(404).json({ message: 'Keyword not found' });
    res.json({ message: 'Keyword deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
