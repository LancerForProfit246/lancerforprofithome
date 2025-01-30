const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming seller is a type of User
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, default: 'processing' } // e.g., processing, shipped, delivered, canceled
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;
