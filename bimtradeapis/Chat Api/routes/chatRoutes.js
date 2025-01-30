const express = require('express');
const {
  addAttachment,
  updateAttachment,
  deleteAttachment,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createGroup,
  updateGroup,
  deleteGroup,
  sendMessage,
  editMessage,
  createNotification,
  updateNotification,
  deleteNotification,
  updatePresence,
  addEmoticon,
  addShopRegular,
} = require('../controllers/chatcontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole, roles } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/attachment', authMiddleware, checkRole([roles.USER, roles.ADMIN]), addAttachment);
router.put('/attachment/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), updateAttachment);
router.delete('/attachment/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), deleteAttachment);

router.post('/blogpost', authMiddleware, checkRole([roles.USER, roles.ADMIN]), createBlogPost);
router.put('/blogpost/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), updateBlogPost);
router.delete('/blogpost/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), deleteBlogPost);

router.post('/group', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), createGroup);
router.put('/group/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), updateGroup);
router.delete('/group/:id', authMiddleware, checkRole([roles.ADMIN, roles.SELLER]), deleteGroup);

router.post('/message', authMiddleware, checkRole([roles.USER, roles.ADMIN]), sendMessage);
router.put('/message/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), editMessage);

router.post('/notification', authMiddleware, checkRole([roles.USER, roles.ADMIN]), createNotification);
router.put('/notification/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), updateNotification);
router.delete('/notification/:id', authMiddleware, checkRole([roles.USER, roles.ADMIN]), deleteNotification);

router.post('/presence', authMiddleware, checkRole([roles.USER, roles.ADMIN]), updatePresence);

router.post('/emoticon', authMiddleware, checkRole([roles.USER, roles.ADMIN]), addEmoticon);

router.post('/shopregular', authMiddleware, checkRole([roles.ADMIN]), addShopRegular);

module.exports = router;
