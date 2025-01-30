const Product = require('../models/SellerProducts');
const Seller = require('../models/Seller');

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, category, sellerId } = req.body;

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      stock,
      category,
      seller: sellerId
    });

    await newProduct.save();

    // Update seller's products list
    const seller = await Seller.findById(sellerId);
    seller.products.push(newProduct._id);
    await seller.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View all products
const viewProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addProduct, editProduct, deleteProduct, viewProducts };
