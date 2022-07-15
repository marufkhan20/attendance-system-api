const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

/**
 * Create new attendance
 */
const getEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (running) throw error("Already Running...", 400);

    const attendance = new AdminAttendance({});
    await attendance.save();

    return res.status(201).json({ message: "Success", attendance });
  } catch (err) {
    next(err);
  }
};

// Get Attendance Status
const getStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (!running) throw error("Not Running!!", 400);

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

// Enable Attendance Status Disable
const getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) throw error("Not Running!!", 400);

    running.status = "COMPLETED";
    await running.save();

    return res.status(200).json({ message: "Disabled!!", running });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEnable,
  getStatus,
  getDisable,
};
