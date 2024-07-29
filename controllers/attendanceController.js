const Attendance = require("../models/attendanceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.createAttendance = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const today = Date.now();

  if (!user) return next(new AppError("Please provide a user.", 400));

  const existingAttendance = await Attendance.findOne({
    user,
    attendanceDate: today,
  });

  if (existingAttendance) {
    return next(new AppError("Duplicate entry...", 400));
  }

  const newAttendance = await Attendance.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      attendance: newAttendance,
    },
  });
});

exports.getAttendance = factory.getOne(Attendance);
exports.getAllAttendances = factory.getAll(Attendance);
exports.updateAttendance = factory.updateOne(Attendance);
exports.deleteAttendance = factory.deleteOne(Attendance);
