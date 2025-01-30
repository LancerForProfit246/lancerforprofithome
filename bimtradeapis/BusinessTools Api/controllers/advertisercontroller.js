const Advertiser = require('../models/Advertiser');

// Create a new advertiser
const createAdvertiser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newAdvertiser = new Advertiser({ name, email, phone, address });
    await newAdvertiser.save();
    res.status(201).json(newAdvertiser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all advertisers
const getAllAdvertisers = async (req, res) => {
  try {
    const advertisers = await Advertiser.find();
    res.status(200).json(advertisers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single advertiser by ID
const getAdvertiserById = async (req, res) => {
  try {
    const { id } = req.params;
    const advertiser = await Advertiser.findById(id);
    if (!advertiser) {
      return res.status(404).json({ message: 'Advertiser not found' });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an advertiser
const updateAdvertiser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const updatedAdvertiser = await Advertiser.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );
    if (!updatedAdvertiser) {
      return res.status(404).json({ message: 'Advertiser not found' });
    }
    res.status(200).json(updatedAdvertiser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an advertiser
const deleteAdvertiser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdvertiser = await Advertiser.findByIdAndDelete(id);
    if (!deletedAdvertiser) {
      return res.status(404).json({ message: 'Advertiser not found' });
    }
    res.status(200).json({ message: 'Advertiser deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createAdvertiser,
  getAllAdvertisers,
  getAdvertiserById,
  updateAdvertiser,
  deleteAdvertiser,
};
