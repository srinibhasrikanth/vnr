const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const { hashPassword, comparePassword } = require("../helper/authHelper.js");
const adminModel = require("../models/adminModel.js");
const nodemailer = require("nodemailer");

//user signup
const registerController = async (req, res) => {
  try {
    const {
      rollNumber,
      name,
      gender,
      branch,
      section,
      admission,
      year,
      whatsappNumber,
      personalEmail,
      collegeEmail,
      currentAddress,
      permanentAddress,
      state,
      laptop,
      fatherName,
      fatherWhatsappNumber,
      fatherPresentAddress,
      fatherProfession,
      fatherCompany,
      motherName,
      motherWhatsappNumber,
      motherPresentAddress,
      motherProfession,
      motherCompany,

      password,
      confirmPassword,
    } = req.body;
    //validations

    //check user
    const exisitingUser = await userModel.findOne({ rollNumber });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    if (password === confirmPassword) {
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
        rollNumber,
        name,
        gender,
        branch,
        section,
        admission,
        year,
        whatsappNumber,
        personalEmail,
        collegeEmail,
        currentAddress,
        permanentAddress,
        state,
        laptop,
        fatherName,
        fatherWhatsappNumber,
        fatherPresentAddress,
        fatherProfession,
        fatherCompany,
        motherName,
        motherWhatsappNumber,
        motherPresentAddress,
        motherProfession,
        motherCompany,
        password: hashedPassword,
      }).save();
      // Send registration email
      sendRegistrationEmail(user.personalEmail, user.name);

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } else {
      res.status(203).send({
        success: false,
        message: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//admin signup
const registerAdminController = async (req, res) => {
  try {
    const { username, personalEmail, password, confirmPassword } = req.body;
    //validations

    //check user
    const exisitingUser = await adminModel.findOne({ username });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    if (password === confirmPassword) {
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new adminModel({
        username,
        personalEmail,
        password: hashedPassword,
      }).save();

      // Send registration email
      sendRegistrationEmail(user.personalEmail);

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } else {
      res.status(203).send({
        success: false,
        message: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//userlogin
const loginController = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    //validation
    if (!rollNumber || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ rollNumber });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      rollNumber,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//admin login
const loginAdminController = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await adminModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        user,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Function to send registration email
const sendRegistrationEmail = async (userEmail, username) => {
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
    Subject: Welcome to VNRVJIET TRAINING - Your Account Registration is Complete!

    Dear ${username},

    Welcome to VNRVJIET TRAINING! We are thrilled to have you on board, and we appreciate the trust you have placed in us. Your account registration is now complete, and you are all set to explore the exciting features and services we have to offer.

    Here are a few key details about your account:

    Username: ${username}
    Email Address: ${userEmail}

    To get started, you can log in to your account using the following link: [Login Link]

    Once logged in, you'll be able to:

    - Access and manage your profile information
    - Explore our wide range of products/services
    - Place orders and track their status
    - Stay updated on promotions, news, and important announcements

    If you have any questions or need assistance, our customer support team is here to help. Feel free to reach out to us at [Customer Support Email] or call us at [Customer Support Phone Number].

    Thank you for choosing VNRVJIET TRAINING. We look forward to serving you and providing you with a seamless and enjoyable experience.

    Best regards,

    S Murali Mohan
    VNRVJIET TRAINING
    +91 9440339219
  `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "srinibha.srikanth@gmail.com",
    to: userEmail,
    subject:
      "Welcome to VNRVJIET TRAINING - Your Account Registration is Complete!",
    text: emailBody,
  });

  console.log("Email sent: %s", info.messageId);
};

module.exports = {
  registerController,
  loginController,
  registerAdminController,
  loginAdminController,
};
