const Promotion = require('../models/Promotion');

// Create a new promotion
const createPromotion = async (req, res) => {
  try {
    const { code, discount, startDate, endDate } = req.body;
    const newPromotion = new Promotion({ code, discount, startDate, endDate });
    await newPromotion.save();
    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a promotion
const editPromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, req.body, { new: true });
    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a promotion
const deletePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const promotion = await Promotion.findByIdAndDelete(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json({ message: 'Promotion deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPromotion, editPromotion, deletePromotion };
