const Seller = require('../models/Seller');
const Product = require('../models/SellerProducts');

// Create a new seller
const createSeller = async (req, res) => {
  try {
    const { name, email, phone, address, storeName } = req.body;
    const newSeller = new Seller({ name, email, phone, address, storeName });
    await newSeller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all sellers
const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate('products');
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single seller by ID
const getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id).populate('products');
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a seller
const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, storeName } = req.body;
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { name, email, phone, address, storeName },
      { new: true }
    );
    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a seller
const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeller = await Seller.findByIdAndDelete(id);
    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json({ message: 'Seller deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
};
