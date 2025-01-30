const express = require('express');
const { addCategory, editCategory, deleteCategory } = require('../controllers/categorycontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkRole(roles.ADMIN), addCategory);
router.put('/:categoryId', authMiddleware, checkRole(roles.ADMIN), editCategory);
router.delete('/:categoryId', authMiddleware, checkRole(roles.ADMIN), deleteCategory);

module.exports = router;
