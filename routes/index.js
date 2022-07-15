const router = require("express").Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const authenticate = require("../middlewares/authenticate");
const adminAttendanceRoutes = require("../routes/adminAttendanceRoutes");
const studentAttendanceRoutes = require("../routes/studentAttendanceRoutes");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoutes);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRoutes);

module.exports = router;
