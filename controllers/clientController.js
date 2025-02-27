const Client = require("../models/clientModel");

// Create a new client
const createClient = async (req, res) => {
  try {
    const {
      name,
      website,
      industry,
      location,
      address,
      incorporationDate,
      countryOfRegistration,
      registrationNumber,
      lineOfBusiness,
      countryOfBusiness,
      referredBy,
      linkedInProfile,
      linkedInPage,
      email,
      clientStage,
      clientRm,
      clientTeam,
      clientAge,
      jobCount
    } = req.body;

    // Check required fields based on the model
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    
    if (!industry) {
      return res.status(400).json({ message: "Industry is required" });
    }
    
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }
    
    if (!countryOfRegistration) {
      return res.status(400).json({ message: "Country of registration is required" });
    }
    
    if (!lineOfBusiness) {
      return res.status(400).json({ message: "Line of business is required" });
    }
    
    if (!countryOfBusiness) {
      return res.status(400).json({ message: "Country of business is required" });
    }

    // Create new client with all fields
    const newClient = new Client({
      name,
      website,
      industry,
      location,
      address,
      incorporationDate,
      countryOfRegistration,
      registrationNumber,
      lineOfBusiness,
      countryOfBusiness,
      referredBy,
      linkedInProfile,
      linkedInPage,
      email,
      profileImage: req.files && req.files.profileImage ? req.files.profileImage[0].filename : undefined,
      crCopy: req.files && req.files.crCopy ? req.files.crCopy[0].filename : undefined,
      vatCopy: req.files && req.files.vatCopy ? req.files.vatCopy[0].filename : undefined,
      gstTinDocument: req.files && req.files.gstTinDocument ? req.files.gstTinDocument[0].filename : undefined,
      clientStage,
      clientRm,
      clientTeam,
      clientAge,
      jobCount
    });

    await newClient.save();
    res.status(201).json({ message: "Client created successfully", client: newClient });
  } catch (error) {
    console.error("Error creating client:", error);
    
    // Handle duplicate email error specifically
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    res.status(500).json({ message: "Error creating client", error: error.message });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findOne({ _id: id });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    return res.json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update client by ID
const updateClient = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.params.id;
    

    // console.log(req.params.id);
    const client = await Client.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    return res.json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete client by ID
const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    await Client.findByIdAndDelete(id);
    return res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };