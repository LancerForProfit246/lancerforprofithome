const express = require('express');
const {
  addProduct,
  editProduct,
  deleteProduct,
  viewProducts
} = require('../controllers/productcontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// Route to add a new product
router.post('/', authMiddleware, checkRole(roles.SELLER), addProduct);

// Route to edit a product by ID
router.put('/:id', authMiddleware, checkRole(roles.SELLER), editProduct);

// Route to delete a product by ID
router.delete('/:id', authMiddleware, checkRole(roles.SELLER), deleteProduct);

// Route to view all products
router.get('/', authMiddleware, checkRole(roles.SELLER), viewProducts);

module.exports = router;
