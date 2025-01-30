const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

// Seller Reports

// Sales Performance Report
const getSalesPerformance = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const sales = await Sale.find({ seller: sellerId }).populate('product');
    const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
    const salesByDate = sales.reduce((acc, sale) => {
      const date = sale.date.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + sale.totalAmount;
      return acc;
    }, {});

    res.status(200).json({ totalSales, salesByDate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Product Performance Report
const getProductPerformance = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ seller: sellerId }).populate('category');
    const bestSellingProducts = await Sale.aggregate([
      { $match: { seller: mongoose.Types.ObjectId(sellerId) } },
      { $group: { _id: '$product', totalQuantity: { $sum: '$quantity' } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]).populate('product');

    res.status(200).json({ products, bestSellingProducts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Customer Demographics and Behavior
const getCustomerDemographics = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const customers = await Customer.find({ 'purchaseHistory.seller': sellerId });

    const demographics = customers.reduce((acc, customer) => {
      const city = customer.address.city;
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({ customers, demographics });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Customer Reports

// Purchase History
const getPurchaseHistory = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customer: customerId }).populate('products.product');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Product Recommendations
const getProductRecommendations = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId).populate('purchaseHistory');
    const purchasedProductIds = customer.purchaseHistory.map(purchase => purchase.product);

    const recommendations = await Product.find({
      _id: { $nin: purchasedProductIds }
    }).limit(5);

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Activity Summary
const getActivitySummary = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customer: customerId });
    const orderStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({ orders, orderStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getSalesPerformance,
  getProductPerformance,
  getCustomerDemographics,
  getPurchaseHistory,
  getProductRecommendations,
  getActivitySummary,
};
