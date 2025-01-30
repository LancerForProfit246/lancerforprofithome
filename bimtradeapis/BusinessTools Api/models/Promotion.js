const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // Percentage discount
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Promotion = mongoose.model('Promotion', PromotionSchema);
module.exports = Promotion;
