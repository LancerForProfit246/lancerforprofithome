const express = require('express');
const {
    createCustomer,
    readCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customercontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// Route to create a customer
router.post('/', authMiddleware, checkRole(roles.ADMIN), createCustomer);

// Route to get a customer by ID
router.get('/:id', authMiddleware, checkRole([roles.ADMIN, roles.USER]), readCustomer);

// Route to update a customer by ID
router.put('/:id', authMiddleware, checkRole(roles.ADMIN), updateCustomer);

// Route to delete a customer by ID
router.delete('/:id', authMiddleware, checkRole(roles.ADMIN), deleteCustomer);

module.exports = router;
