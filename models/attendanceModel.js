const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  attendanceType: {
    type: String,
    required: [true, "Please provide attendance type"],
    enum: {
      values: ["present", "absent", "leave"],
      message: "Attendance type is either: present, absent, or leave",
    },
  },
  attendanceDate: {
    type: Date,
    required: [true, "Please provide a date"],
    default: Date.now(),
  },
  reason: {
    type: String,
    validate: {
      validator: function (v) {
        return this.attendanceType === "leave" ? !!v : true;
      },
      message: "Reason is required if attendance type is leave",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user"],
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
