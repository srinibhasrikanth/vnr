const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
});

const resourceModel = new mongoose.model("resource", resourceSchema);

module.exports = resourceModel;
