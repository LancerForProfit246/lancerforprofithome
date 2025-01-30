const mongoose = require('mongoose');

const AdvertiserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const Advertiser = mongoose.model('Advertiser', AdvertiserSchema);
module.exports = Advertiser;
