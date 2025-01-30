// auth/routes/authRoutes.js
const express = require('express');
const { register, login, protectedRoute } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { roles, checkRole } = require('../middlewares/authorizationMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route for all authenticated users
router.get('/protected', authMiddleware, protectedRoute);

// Admin only routes
router.get('/admin/users', authMiddleware, checkRole(roles.ADMIN), (req, res) => {
  // Implementation for viewing users
});

router.post('/admin/products', authMiddleware, checkRole(roles.ADMIN), (req, res) => {
  // Implementation for adding products
});

module.exports = router;
