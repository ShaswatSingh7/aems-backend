// activityRoutes.js

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Route to create a new activity
router.post('/', activityController.createActivity);

// Route to get all activities
router.get('/', activityController.getAllActivities);

// Route to get an activity by ID
router.get('/:id', activityController.getActivityById);

// Route to delete an activity by ID
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
