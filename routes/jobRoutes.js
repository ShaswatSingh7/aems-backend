const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { createJob, getJobs, getJobById, updateJobById, deleteJobById } = require("../controllers/jobController");

const router = express.Router();

// Route for creating a job
router.post("/", createJob);

// Route to get all jobs
router.get("/", getJobs);

// Route to get job by ID
router.get("/:id", getJobById);

// Route to update job by ID
router.patch("/:id", updateJobById);

// Route to delete job by ID
router.delete("/:id", deleteJobById);

module.exports = router;