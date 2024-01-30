const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
  },
  idNumber: {
    type: String,
  },
});

const resourceModel = new mongoose.model("resource", resourceSchema);

module.exports = resourceModel;
