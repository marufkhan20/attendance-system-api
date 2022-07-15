const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

/**
 * Get Attendance Status
 */
const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (!running) throw error("Not Running!!", 400);

    // time limit check
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    const timeLimit = isAfter(new Date(), started);

    if (timeLimit) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (err) {
    next(err);
  }
};

/**
 * Get Enable Attendance
 */
const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) throw error("Invalid Attendance ID!!", 400);

    // find student attendance with admin attendance id
    const studentAttendance = await StudentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });

    // check student attendance here or not
    if (studentAttendance) {
      throw error("You're Already Attendance!!", 400);
    }

    // check status completed
    if (adminAttendance.status === "COMPLETED")
      throw error("Not Attendance Running!!", 400);

    // time limit check
    const started = addMinutes(
      new Date(adminAttendance.createdAt),
      adminAttendance.timeLimit
    );
    const timeLimit = isAfter(new Date(), started);
    if (timeLimit) {
      adminAttendance.status = "COMPLETED";
      await adminAttendance.save();
      throw error("Timeout Attendance!!", 400);
    }

    // create new attendance
    const attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });
    await attendance.save();

    return res.status(201).json({ message: "success", attendance });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAttendanceStatus,
  getAttendance,
};
