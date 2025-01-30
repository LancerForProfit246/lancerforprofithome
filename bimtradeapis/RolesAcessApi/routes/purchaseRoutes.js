const express = require('express');
const { createPurchase } = require('../controllers/purchasecontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkRole(roles.USER), createPurchase);

module.exports = router;
