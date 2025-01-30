// models/Payment.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ['created', 'approved', 'failed'], default: 'created' },
  paypalPaymentId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
