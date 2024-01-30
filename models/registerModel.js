// Define the Mongoose schema for the registerModel
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  courseDetails: {
    type: Object, // You can adjust the type based on your actual data structure
    required: true,
  },
  userDetails: {
    type: Object, // You can adjust the type based on your actual data structure
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose model for the registerModel
const registerModel = mongoose.model('Register', registerSchema);

module.exports = registerModel;
