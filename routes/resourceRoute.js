const express = require("express");
const {
  createResourceController,
  getResourceController,
} = require("../controllers/resourceController");

const router = express.Router();

router.post("/create-instructor", createResourceController);

router.get("/get-instructor", getResourceController);


module.exports = router;
