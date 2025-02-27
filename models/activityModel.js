const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  activityType: {
    type: String,
    enum: ['CALL', 'MEETING', 'TASK', 'EMAIL', 'INTERVIEW'],
    required: false
  },
  activityDate: {
    type: Date,
    required: false
  },
  duration: {
    type: String,
    required: false  // Example: '15 Minutes', '30 Minutes', etc.
  },
  location: {
    type: String,  // Could be physical location or online
  },
  relatedClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false
  },
  assignees: [{
    type: String  // List of assignees or emails
  }],
  attendees: [{
    type: String  // List of attendees or emails
  }],
  isBCC: {
    type: Boolean,
    default: false
  },
  onlineMeetingURL: {
    type: String,  // URL for the meeting (if any)
  },
  importance: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  description: {
    type: String,
  },
  attachments: [{
    filename: String,
    fileURL: String,  // URL to the uploaded file (could be stored on S3, etc.)
    fileType: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Activity model
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
