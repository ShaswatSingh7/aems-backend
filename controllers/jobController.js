const Job = require("../models/jobModel");

// Create a new job
const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      department,
      client,
      jobPosition,
      location,
      headcount,
      stage,
      minimumSalary,
      maximumSalary,
      jobType,
      experience,
      salaryRange
    } = req.body;

    // Check required fields based on the model
    if (!jobTitle) {
      return res.status(400).json({ message: "Job title is required" });
    }
    
    if (!department) {
      return res.status(400).json({ message: "Department is required" });
    }
    
    if (!client) {
      return res.status(400).json({ message: "Client is required" });
    }
    
    // Create new job with all fields
    const newJob = new Job({
      jobTitle,
      department,
      client,
      jobPosition,
      location,
      headcount,
      stage,
      minimumSalary,
      maximumSalary,
      jobType,
      experience,
      salaryRange
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.find({ _id: id });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    return res.json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update job by ID
const updateJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    return res.json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete job by ID
const deleteJobById = async (req, res) => {
  try {
    const id = req.params.id;
    await Job.findOneAndRemove({ _id: id });
    return res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJobById, deleteJobById };