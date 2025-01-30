const Campaign = require('../models/Campaign');

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { title, description, advertiser, startDate, endDate, budget } = req.body;
    const newCampaign = new Campaign({ title, description, advertiser, startDate, endDate, budget });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('advertiser');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id).populate('advertiser');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a campaign
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, advertiser, startDate, endDate, budget } = req.body;
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { title, description, advertiser, startDate, endDate, budget },
      { new: true }
    );
    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
