const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // 'user', 'admin', 'seller', etc.
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
