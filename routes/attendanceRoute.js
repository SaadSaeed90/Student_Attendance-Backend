const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create", attendanceController.createAttendance);

module.exports = router;
