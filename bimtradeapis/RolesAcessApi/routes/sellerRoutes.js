const express = require('express');
const {
  createSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller
} = require('../controllers/sellercontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// Route to create a new seller
router.post('/', authMiddleware, checkRole(roles.ADMIN), createSeller);

// Route to get all sellers
router.get('/', authMiddleware, checkRole(roles.ADMIN), getAllSellers);

// Route to get a single seller by ID
router.get('/:id', authMiddleware, checkRole(roles.ADMIN), getSellerById);

// Route to update a seller by ID
router.put('/:id', authMiddleware, checkRole(roles.ADMIN), updateSeller);

// Route to delete a seller by ID
router.delete('/:id', authMiddleware, checkRole(roles.ADMIN), deleteSeller);

module.exports = router;
