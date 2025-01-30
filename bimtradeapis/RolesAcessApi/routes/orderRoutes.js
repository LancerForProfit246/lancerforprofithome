const express = require('express');
const { viewOrders, updateOrderStatus, refundOrder } = require('../controllers/ordercontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.get('/', authMiddleware, checkRole(roles.ADMIN), viewOrders);
router.patch('/:orderId/status', authMiddleware, checkRole(roles.ADMIN), updateOrderStatus);
router.post('/:orderId/refund', authMiddleware, checkRole(roles.ADMIN), refundOrder);

module.exports = router;
