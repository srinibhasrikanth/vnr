const mongoose = require("mongoose");
const ROLL_NUMBER_PATTERN = /^(21071|20071|22071|23071)A\d{1,5}[a-zA-Z0-9]*$/;

const WHATSAPP_NUMBER_PATTERN = /^\d{10}$/;
const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const userSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => ROLL_NUMBER_PATTERN.test(v),
        message: (props) => `${props.value} is not a valid roll number!`,
      },
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    branch: {
      type: String,

      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    admission: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => WHATSAPP_NUMBER_PATTERN.test(v),
        message: (props) =>
          `${props.value} is not a valid WhatsApp number! It should have exactly 10 digits.`,
      },
    },

    personalEmail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => EMAIL_PATTERN.test(v),
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    collegeEmail: {
      type: String,

      validate: {
        validator: function (v) {
          // Check if v is a valid email address
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    currentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    laptop: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    fatherWhatsappNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => WHATSAPP_NUMBER_PATTERN.test(v),
        message: (props) =>
          `${props.value} is not a valid WhatsApp number! It should have exactly 10 digits.`,
      },
    },
    fatherPresentAddress: {
      type: String,
    },
    fatherProfession: {
      type: String,
    },
    fatherCompany: {
      type: String,
    },
    motherName: {
      type: String,
    },
    motherWhatsappNumber: {
      type: String,

      validate: {
        validator: (v) => WHATSAPP_NUMBER_PATTERN.test(v),
        message: (props) =>
          `${props.value} is not a valid WhatsApp number! It should have exactly 10 digits.`,
      },
    },
    motherPresentAddress: {
      type: String,
    },
    motherProfession: {
      type: String,
    },
    motherCompany: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    razorpayTransactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
