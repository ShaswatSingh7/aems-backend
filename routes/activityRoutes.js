// activityRoutes.js

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const upload = require("../middleware/uploadMiddleware");
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/zip',
    'application/x-rar-compressed',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'video/quicktime',
    'video/mp4',
    'video/x-msvideo',
    'application/vnd.ms-powerpoint',
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadOptions = {
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: fileFilter,
};

upload.fields = uploadOptions;

// Route to create a new activity
router.post('/', upload.single('image'), activityController.createActivity);

// Route to get all activities
router.get('/', activityController.getAllActivities);

// Route to get an activity by ID
router.get('/:id', activityController.getActivityById);

// Route to delete an activity by ID
router.delete('/:id', activityController.deleteActivity);

module.exports = router;