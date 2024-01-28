const resourceModel = require("../models/resourceModel");

const createResourceController = async (req, res) => {
  try {
    const resource = req.body;
    const newResource = new resourceModel(resource);
    const saveResource = await newResource.save();
    res.status(200).json({
      success: true,
      message: "Successfully resource person details added",
      saveResource,
    });
  } catch (error) {
    console.log("Error during creation:", error); // Log the error to the console
    res.status(403).json({
      success: false,
      message: "Something went wrong, creation unsuccessful",
      error: error.message, // Send the error message in the response
    });
  }
};

const editResourceController = async (req, res) => {};

const deleteResourceController = async (req, res) => {};

const getResourceController = async (req, res) => {
  try {
    const resources = await resourceModel.find({});
    res.status(200).json(resources);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

module.exports = {
  createResourceController,
  editResourceController,
  deleteResourceController,
  getResourceController,
};
