const SaleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  });
  
  const Sale = mongoose.model('Sale', SaleSchema);
  module.exports = Sale;