const AdPlacement = require('../models/AdPlacement');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage }).single('imageUrl');

// Create a new ad placement
const createAdPlacement = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'File upload error', err });
      }
      const { campaign, placementType, position, link } = req.body;
      const newAdPlacement = new AdPlacement({
        campaign,
        placementType,
        position,
        imageUrl: req.file.path,
        link
      });
      await newAdPlacement.save();
      res.status(201).json(newAdPlacement);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all ad placements
const getAllAdPlacements = async (req, res) => {
  try {
    const adPlacements = await AdPlacement.find().populate('campaign');
    res.status(200).json(adPlacements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single ad placement by ID
const getAdPlacementById = async (req, res) => {
  try {
    const { id } = req.params;
    const adPlacement = await AdPlacement.findById(id).populate('campaign');
    if (!adPlacement) {
      return res.status(404).json({ message: 'Ad placement not found' });
    }
    res.status(200).json(adPlacement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an ad placement
const updateAdPlacement = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'File upload error', err });
      }
      const { id } = req.params;
      const { campaign, placementType, position, link } = req.body;
      const updatedAdPlacement = await AdPlacement.findByIdAndUpdate(
        id,
        {
          campaign,
          placementType,
          position,
          imageUrl: req.file ? req.file.path : undefined,
          link
        },
        { new: true }
      );
      if (!updatedAdPlacement) {
        return res.status(404).json({ message: 'Ad placement not found' });
      }
      res.status(200).json(updatedAdPlacement);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an ad placement
const deleteAdPlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdPlacement = await AdPlacement.findByIdAndDelete(id);
    if (!deletedAdPlacement) {
      return res.status(404).json({ message: 'Ad placement not found' });
    }
    res.status(200).json({ message: 'Ad placement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createAdPlacement,
  getAllAdPlacements,
  getAdPlacementById,
  updateAdPlacement,
  deleteAdPlacement,
};
