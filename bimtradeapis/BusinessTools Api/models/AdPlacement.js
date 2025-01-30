const mongoose = require('mongoose');

const AdPlacementSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  placementType: { type: String, required: true }, // e.g., banner, sidebar, popup
  position: { type: String, required: true }, // e.g., top, bottom, left, right
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AdPlacement = mongoose.model('AdPlacement', AdPlacementSchema);
module.exports = AdPlacement;
