const express = require('express');
const {
  getSalesPerformance,
  getProductPerformance,
  getCustomerDemographics,
  getPurchaseHistory,
  getProductRecommendations,
  getActivitySummary,
} = require('../controllers/reportcontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// Seller Reports
router.get('/seller/sales-performance/:sellerId', authMiddleware, checkRole(roles.SELLER), getSalesPerformance);
router.get('/seller/product-performance/:sellerId', authMiddleware, checkRole(roles.SELLER), getProductPerformance);
router.get('/seller/customer-demographics/:sellerId', authMiddleware, checkRole(roles.SELLER), getCustomerDemographics);

// Customer Reports
router.get('/customer/purchase-history/:customerId', authMiddleware, checkRole(roles.USER), getPurchaseHistory);
router.get('/customer/product-recommendations/:customerId', authMiddleware, checkRole(roles.USER), getProductRecommendations);
router.get('/customer/activity-summary/:customerId', authMiddleware, checkRole(roles.USER), getActivitySummary);

module.exports = router;
