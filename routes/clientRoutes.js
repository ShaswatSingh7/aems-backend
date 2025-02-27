const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { 
  createClient, 
  getClients, 
  getClientById, 
  updateClient, 
  deleteClient, 
//   countClients
} = require("../controllers/clientController");

const router = express.Router();

// Route for creating a client with file uploads
router.post("/", upload.any(), createClient);

// Route to get all clients
router.get("/", getClients);

// Route to get client by ID
router.get("/:id", getClientById);

// Route to update client by ID
router.patch("/:id", updateClient);

// Route to delete client by ID
router.delete("/:id", deleteClient);

// Route to count clients
// router.get("/count", countClients);

module.exports = router;