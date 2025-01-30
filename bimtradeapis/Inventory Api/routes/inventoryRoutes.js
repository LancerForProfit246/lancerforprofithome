const express = require('express');
const { viewInventory, updateInventory } = require('../controllers/inventorycontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.get('/', authMiddleware, checkRole(roles.ADMIN), viewInventory);
router.patch('/:productId', authMiddleware, checkRole(roles.ADMIN), updateInventory);

module.exports = router;
