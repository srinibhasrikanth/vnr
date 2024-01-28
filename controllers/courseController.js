const JWT = require("jsonwebtoken");
const courseModel = require("../models/courseModel.js");

const createCourseController = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new courseModel(courseData);
    const saveCourse = await newCourse.save();
    res.status(200).json({
      success: true,
      message: "Successfully course is created",
      saveCourse,
    });
  } catch (error) {
    console.log("Error during course creation:", error);
    res.status(403).json({
      success: false,
      message: "Something went wrong, creation unsuccessful",
      error: error.message,
    });
  }
};

const editCourseController = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updateFields = req.body;

    // Check if 'activate' field is present in request body
    if (updateFields.activate !== undefined) {
      // Activate or deactivate the course based on the 'activate' field
      updateFields.active = updateFields.activate ? "1" : "0";
      updateFields.upcoming = updateFields.activate ? "0" : "1";
      delete updateFields.activate; // Remove the 'activate' field from the updateFields
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      updateFields,
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({
      success: false,
      message: "Error editing course",
      error: error.message,
    });
  }
};

const deleteCourseController = async (req, res) => {};

const getCoursesController = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

const activateCourseController = async (req, res) => {
  const courseId = req.params.id;

  try {
    const activatedCourse = await courseModel.activateCourse(courseId);
    res.status(200).json({
      success: true,
      message: "Course activated successfully",
      activatedCourse,
    });
  } catch (error) {
    console.error("Error activating course:", error);
    res.status(500).json({
      success: false,
      message: "Error activating course",
      error: error.message,
    });
  }
};

const deactivateCourseController = async (req, res) => {
  const courseId = req.params.id;

  try {
    const deactivatedCourse = await courseModel.deactivateCourse(courseId);
    res.status(200).json({
      success: true,
      message: "Course deactivated successfully",
      deactivatedCourse,
    });
  } catch (error) {
    console.error("Error deactivating course:", error);
    res.status(500).json({
      success: false,
      message: "Error deactivating course",
      error: error.message,
    });
  }
};

module.exports = {
  createCourseController,
  editCourseController,
  deleteCourseController,
  getCoursesController,
  activateCourseController,
  deactivateCourseController,
};
