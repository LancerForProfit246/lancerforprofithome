const express = require('express');
const { updateSiteSettings, manageIntegrations } = require('../controllers/settingscontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.put('/site', authMiddleware, checkRole(roles.ADMIN), updateSiteSettings);
router.put('/integrations', authMiddleware, checkRole(roles.ADMIN), manageIntegrations);

module.exports = router;
