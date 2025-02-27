const multer = require("multer");
const path = require("path");

// Set storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

// File filter (accept only images and PDFs)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, and PDF are allowed."), false);
  }
};

// Create the multer upload middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
