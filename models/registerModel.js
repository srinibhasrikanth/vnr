const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  rollNumber: {
    type: String,
    require: true,
  },
  branch: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  section: {
    type: String,
    require: true,
  },
});

const registerModel = mongoose.model("registrations", registerSchema);
module.exports = registerModel;
