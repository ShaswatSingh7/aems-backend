// activityController.js

const Activity = require("../models/activityModel");

// Controller to handle the creation of an activity
const createActivity = async (req, res) => {
  try {
    const {
  activityName,
  activityType,
  startDate,
  endDate,
  description,
  location,
  organizer,
  attendees,
  isBCC,
  onlineMeetingURL,
  importance,
  attachments
} = req.body;

    // Check required fields based on the model
    if (!req.body.activityName) {
      return res.status(400).json({ message: "Activity name is required" });
    }

    if (!activityType) {
      return res.status(400).json({ message: "Activity type is required" });
    }

    if (!startDate) {
      return res.status(400).json({ message: "Start date is required" });
    }

    if (!endDate) {
      return res.status(400).json({ message: "End date is required" });
    }

    // Create new activity with all fields
    const newActivity = new Activity({
      title: activityName,
      activityType,
      activityDate: startDate,
      duration: endDate, // Update this field according to your needs
      description,
      location,
      relatedClient: organizer, // Assuming organizer is the related client ID
      assignees: attendees, // Assuming attendees are the assignees
      attendees,
      isBCC,
      onlineMeetingURL,
      importance,
      attachments,
    });

    await newActivity.save();
    res.status(201).json({ message: "Activity created successfully", activity: newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);

    // Handle duplicate activity error specifically
    if (error.code === 11000 && error.keyPattern && error.keyPattern.activityName) {
      return res.status(400).json({ message: "Activity name already exists" });
    }

    res.status(500).json({ message: "Error creating activity", error: error.message });
  }
};

// Controller to get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a single activity by ID
const getActivityById = async (req, res) => {
  try {
    const id = req.params.id;
    const activity = await Activity.findOne({ _id: id });
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    return res.json(activity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update an activity
const updateActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const activity = await Activity.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    return res.json(activity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete an activity
const deleteActivity = async (req, res) => {
  try {
    const id = req.params.id;
    await Activity.findByIdAndDelete(id);
    return res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity
};