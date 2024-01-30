const express = require("express");
const {
  registrationCourse,
  getEachController,
} = require("../controllers/registerController");

const router = express.Router();

router.post("/register-course", registrationCourse);

router.get("/get-register/:courseId", getEachController);
module.exports = router;
