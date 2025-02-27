const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  
  jobPosition: {
    type: String
  },
  location: {
    type: String
  },
  headcount: {
    type: Number
  },
  stage: {
    type: String
  },
  minimumSalary: {
    type: Number
  },
  maximumSalary: {
    type: Number
  },
  jobType: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salaryRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);