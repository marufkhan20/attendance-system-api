const { Schema, model } = require("express");

const studentAttendanceSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
  },
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);
module.exports = StudentAttendance;
