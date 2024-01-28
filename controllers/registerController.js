const mongoose = require("mongoose");
const registerModel = require("../models/registerModel");

const registrationCourse = async (req, res) => {
  try {
    const regCourse = req.body;
    const newCourse = new courseModel(regCourse);
    const saveCourse = await newCourse.save();
    res.status(200).json({
      success: true,
      message: "Successfully registered",
      saveCourse,
    });
  } catch (error) {
    console.log("Error during registration", error); // Log the error to the console
    res.status(403).json({
      success: false,
      message: "Something went wrong, creation unsuccessful",
      error: error.message, // Send the error message in the response
    });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const reg = await registerModel.find({});
    res.status(200).json(reg);
  } catch (error) {
    console.error("Error fetching :", error);
    res.status(500).json({
      success: false,
      message: "Error fetching ",
      error: error.message,
    });
  }
};

module.exports = { registrationCourse, getRegistrations };
