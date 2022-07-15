const router = require("express").Router();
const studentAttendanceController = require("../controllers/studentAttendanceController");

router.get("/status", studentAttendanceController.getAttendanceStatus);
router.get("/:id", studentAttendanceController.getAttendance);

module.exports = router;
