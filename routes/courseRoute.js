const express = require("express");
const {
  createCourseController,
  getCoursesController,
  editCourseController,
  deactivateCourseController,
  activateCourseController,
  updateCourseStatus,
} = require("../controllers/courseController");

const router = express.Router();

router.put("/edit-course/:id", editCourseController);
router.put("/activate/:id", activateCourseController);
router.put("/deactivate/:id", deactivateCourseController);
router.post("/create-course", createCourseController);
// No need to include the token in the route for GET requests
router.get("/get-all-courses", getCoursesController);

module.exports = router;
