const Customer = require('../models/Customer');
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const Product = require('../models/Product');

// Create a new purchase
const createPurchase = async (req, res) => {
  try {
    const { customerId, sellerId, products } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    products.forEach(product => {
      totalAmount += product.quantity * product.price;
    });

    // Create new purchase
    const newPurchase = new Purchase({
      customer: customerId,
      seller: sellerId,
      products,
      totalAmount
    });

    await newPurchase.save();

    // Update customer purchase history
    const customer = await Customer.findById(customerId);
    customer.purchaseHistory.push(newPurchase._id);
    await customer.save();

    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createPurchase };
