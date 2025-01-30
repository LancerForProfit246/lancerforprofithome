const Attachment = require('../models/Attachment');
const BlogPost = require('../models/BlogPost');
const Group = require('../models/Group');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const Presence = require('../models/Presence');
const Emoticons = require('../models/Emoticons');
const Shopregular = require('../models/Shopregular');

// Add a new attachment
const addAttachment = async (req, res) => {
  try {
    const { attachmentid, file } = req.body;
    const newAttachment = new Attachment({ attachmentid, file });
    await newAttachment.save();
    res.status(201).json(newAttachment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an attachment
const updateAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttachment = await Attachment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAttachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json(updatedAttachment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an attachment
const deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttachment = await Attachment.findByIdAndDelete(id);
    if (!deletedAttachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json({ message: 'Attachment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlogPost = new BlogPost({ title, content, author });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a blog post
const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new group
const createGroup = async (req, res) => {
  try {
    const { groupid, groupname, groupdescription, members, adminid, groupimage } = req.body;
    const newGroup = new Group({ groupid, groupname, groupdescription, members, adminid, groupimage });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a group
const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a group
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { messageid, senderid, receiverid, groupid, content } = req.body;
    const newMessage = new Message({ messageid, senderid, receiverid, groupid, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a message
const editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { notifyid, userid, content } = req.body;
    const newNotification = new Notification({ notifyid, userid, content });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a notification
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update presence
const updatePresence = async (req, res) => {
  try {
    const { lastonline } = req.body;
    const newPresence = new Presence({ lastonline });
    await newPresence.save();
    res.status(201).json(newPresence);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add an emoticon
const addEmoticon = async (req, res) => {
  try {
    const { emoticon, emojiname, unicode, imageurl } = req.body;
    const newEmoticon = new Emoticons({ emoticon, emojiname, unicode, imageurl });
    await newEmoticon.save();
    res.status(201).json(newEmoticon);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a shop regular
const addShopRegular = async (req, res) => {
  try {
    const { regularid, packagestatus } = req.body;
    const newShopRegular = new Shopregular({ regularid, packagestatus });
    await newShopRegular.save();
    res.status(201).json(newShopRegular);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
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
};
