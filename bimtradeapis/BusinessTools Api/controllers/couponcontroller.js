// controllers/couponController.js
const Coupon = require('../models/Coupon');

exports.awardCoupon = async (req, res) => {
  try {
    const { userId, discount, expiryDate } = req.body;
    const coupon = new Coupon({ discount, expiryDate, ownerId: userId });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buyCoupon = async (req, res) => {
  try {
    const { userId, couponId } = req.body;
    const coupon = await Coupon.findById(couponId);
    if (coupon.status !== 'available') {
      return res.status(400).json({ error: 'Coupon not available' });
    }
    coupon.status = 'sold';
    coupon.ownerId = userId;
    await coupon.save();
    res.status(200).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sellCoupon = async (req, res) => {
  try {
    const { userId, couponId } = req.body;
    const coupon = await Coupon.findById(couponId);
    if (!coupon.ownerId.equals(userId)) {
      return res.status(403).json({ error: 'Not authorized to sell this coupon' });
    }
    coupon.status = 'available';
    coupon.ownerId = null;
    await coupon.save();
    res.status(200).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
