const express = require('express');
const {
  createAdvertiser,
  getAllAdvertisers,
  getAdvertiserById,
  updateAdvertiser,
  deleteAdvertiser,
} = require('../controllers/advertisercontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkRole([roles.ADMIN]), createAdvertiser);
router.get('/', authMiddleware, checkRole([roles.ADMIN]), getAllAdvertisers);
router.get('/:id', authMiddleware, checkRole([roles.ADMIN]), getAdvertiserById);
router.put('/:id', authMiddleware, checkRole([roles.ADMIN]), updateAdvertiser);
router.delete('/:id', authMiddleware, checkRole([roles.ADMIN]), deleteAdvertiser);

module.exports = router;
