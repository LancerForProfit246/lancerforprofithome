const express = require('express');
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaigncontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), createCampaign);
router.get('/', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), getAllCampaigns);
router.get('/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), getCampaignById);
router.put('/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), updateCampaign);
router.delete('/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), deleteCampaign);

module.exports = router;
