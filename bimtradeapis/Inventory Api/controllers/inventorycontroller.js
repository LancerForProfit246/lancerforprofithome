const Product = require('RolesAccess/models/SellerProducts');

// View inventory
const viewInventory = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update inventory
const updateInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.stock = stock;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { viewInventory, updateInventory };
