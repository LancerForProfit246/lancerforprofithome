const express = require('express');
const {
  createAdPlacement,
  getAllAdPlacements,
  getAdPlacementById,
  updateAdPlacement,
  deleteAdPlacement,
} = require('../controllers/adplacementcontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), createAdPlacement);
router.get('/', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), getAllAdPlacements);
router.get('/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), getAdPlacementById);
router.put('/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), updateAdPlacement);
router.delete('/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), deleteAdPlacement);

module.exports = router;
