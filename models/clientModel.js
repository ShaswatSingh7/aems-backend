const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String },
  incorporationDate: { type: Date },
  countryOfRegistration: { type: String, required: true },
  registrationNumber: { type: String },
  lineOfBusiness: { type: String, required: true },
  countryOfBusiness: { type: String, required: true },
  referredBy: { type: String },
  linkedInProfile: { type: String },
  linkedInPage: { type: String },
  email: { type: String, unique: true, sparse: true },
  profileImage: { type: String },
  crCopy: { type: String },
  vatCopy: { type: String },
  gstTinDocument: { type: String },
  clientStage: {
    type: String,
    enum: ['Lead', 'Engaged', 'Negotiation', 'Signed'],
    default: 'Lead',
  },
  clientRm: {
    type: String
    
  },
  clientTeam: {
    type: String,
    enum: ['Enterprise', 'SMB', 'Mid-Market']
  },
  clientAge: {
    type: String
    
  },
  jobCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Client", clientSchema);