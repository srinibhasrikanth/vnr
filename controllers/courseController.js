const JWT = require("jsonwebtoken");
const courseModel = require("../models/courseModel.js");
const userModel = require("../models/userModel.js");
const nodemailer = require("nodemailer");
const resourceModel = require("../models/resourceModel.js");
const createCourseController = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new courseModel(courseData);
    const saveCourse = await newCourse.save();
    const users = await resourceModel.findOne({
      name: courseData.resourcePerson,
    }); // Retrieve all users
    // Iterate through each user and send registration email

    await sendRegistrationEmail(
      users.email,
      users.name,
      courseData.courseName,
      courseData.duration,
      courseData.startDate,
      courseData.timing
    );

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

// Function to send registration email
const sendRegistrationEmail = async (
  userEmail,
  username,
  courseName,
  duration,
  startDate,
  timing
) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const formattedStartDate = formatDate(startDate);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // Your email configuration, such as service, auth, etc.
    // Example for Gmail:
    service: "gmail",
    auth: {
      user: "srinibha.srikanth@gmail.com",
      pass: "jnyn gkvr luuv awdu",
    },
  });

  // Define the email body
  const emailBody = `
  Dear ${username},
  
  We are pleased to inform you that you have been assigned as the instructor for the following course:
  
  Course Name:${courseName}
  Duration: ${duration}
  Start Date:${formattedStartDate}
  Timings: ${timing}
  
  Your role as an instructor is crucial in providing valuable guidance and knowledge to our students. We trust that your expertise and dedication will contribute greatly to the success of this course.
  
  Please review the course details and ensure that you are available to conduct the classes as scheduled. If you have any questions or concerns, please don't hesitate to reach out to us.
  
  Thank you for accepting this responsibility. We look forward to your valuable contributions to the course.
  
  Best regards,
  VNRVJIET HOSTEL TRAINING
  
  `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "srinibha.srikanth@gmail.com",
    to: userEmail,
    subject: "You have been assigned as the instructor for a new course",
    text: emailBody,
  });

  console.log("Email sent: %s", info.messageId);
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

const getEachController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseModel.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      message: "Successfully fetched",
      course,
    });
  } catch (error) {
    return res.status(203).json({ message: "error" });
  }
};
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

//send all users to register
const sendAllEmail = async (
  userEmail,
  username,
  courseName,
  duration,
  startDate,
  timing
) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const formattedStartDate = formatDate(startDate);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // Your email configuration, such as service, auth, etc.
    // Example for Gmail:
    service: "gmail",
    auth: {
      user: "srinibha.srikanth@gmail.com",
      pass: "jnyn gkvr luuv awdu",
    },
  });

  // Define the email body
  const emailBody = `

Dear ${username},

We are thrilled to announce that a new course, "[Course Name]", is now available for registration! This course offers a fantastic opportunity for you to expand your knowledge and skills in [brief description of the course topic].

Here are the key details of the course:

Course Name:${courseName}
Duration: ${duration}
Start Date:${formattedStartDate}
Timings: ${timing}
We believe that it will be immensely beneficial for your academic and personal growth.

To register for this course and secure your spot, please visit our registration portal [include registration link]. Hurry, as spots are limited and filling up fast!

If you have any questions or require further information about the course, feel free to reach out to us.

We look forward to seeing you in class and sharing this enriching learning experience together!

Best regards,
VNRVJIET HOSTEL TRAINING 

  `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "srinibha.srikanth@gmail.com",
    to: userEmail,
    subject: "You have been assigned as the instructor for a new course",
    text: emailBody,
  });

  console.log("Email sent: %s", info.messageId);
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

const deleteAllRecords = async (req, res) => {
  try {
    // Use the deleteMany() method to delete all records in the collection
    const result = await courseModel.deleteMany({});
    res
      .status(200)
      .json({ message: "All records deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting records", error });
  }
};

module.exports = {
  createCourseController,
  editCourseController,
  deleteCourseController,
  getCoursesController,
  activateCourseController,
  deactivateCourseController,
  getEachController,
  deleteAllRecords,
};
