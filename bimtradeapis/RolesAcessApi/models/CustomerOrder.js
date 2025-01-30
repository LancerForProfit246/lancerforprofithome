const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  status: { type: String, default: 'processing' }, // e.g., processing, shipped, delivered, canceled
  totalAmount: { type: Number, required: true },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
