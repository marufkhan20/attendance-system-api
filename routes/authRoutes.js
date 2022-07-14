const router = require("express").Router();
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// /api/v1/auth/register
router.post("/register", registerController);

// /api/v1/auth/login
router.post("/login", loginController);

module.exports = router;
