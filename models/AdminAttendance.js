const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema({
  timeLimit: Number,
  status: String,
  createdAt: Date,
});

const AdminAttendance = model("AdminAttendacne", adminAttendanceSchema);
module.exports = AdminAttendance;
