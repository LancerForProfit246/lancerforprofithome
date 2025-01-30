// models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['available', 'sold', 'expired'], default: 'available' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

couponSchema.pre('save', function(next) {
  if (!this.code) {
    this.code = require('crypto').randomBytes(10).toString('hex');
  }
  next();
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
