const { registerService, loginService } = require("../services/authServices");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data!!" });
  }

  try {
    const user = await registerService({ name, email, password });
    res.status(201).json({ message: "User created successfully!", user });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    const token = await loginService({ email, password });
    res.status(200).json({ message: "Login Successfull", token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerController,
  loginController,
};
