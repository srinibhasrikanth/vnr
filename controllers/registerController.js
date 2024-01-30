const mongoose = require("mongoose");
const registerModel = require("../models/registerModel");
const courseModel = require("../models/courseModel");

const registrationCourse = async (req, res) => {
  try {
    // Extract course details and user details from request body
    const { courseDetails, userDetails } = req.body;

    // Create a new registration document using the registerModel
    const registration = new registerModel({
      courseDetails,
      userDetails,
    });

    // Save the registration document to the database
    await registration.save();

    // Respond with a success message
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    // Handle any errors and send an appropriate response
    console.error("Error registering course:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
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

const getEachController = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Fetch registrations for the specified course ID
    const registrations = await registerModel.find({ courseId: courseId });

    if (registrations.length > 0) {
      // Extract course name and resource person from the first registration
      const courseId = registrations[0].courseId;
      const courseDetails = await courseModel.findById(courseId);
      const courseName = courseDetails.name;
      const resourcePerson = courseDetails.resourcePerson;

      // Extract user details for each registration
      const userDetails = [];
      for (const registration of registrations) {
        const userId = registration.userId;
        const user = await userModel.findById(userId);
        userDetails.push(user);
      }

      res
        .status(200)
        .json({ registrations, courseName, resourcePerson, userDetails });
    } else {
      res.status(404).json({ message: "No registrations found for courseId" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = { registrationCourse, getAllRegistrations, getEachController };
