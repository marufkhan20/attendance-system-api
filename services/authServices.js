const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userServices");
const error = require("../utils/error");

/**
 * Register Service
 */
const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  // check user by email
  let user = await findUserByProperty("email", email);
  if (user) throw error("User already exist!!", 400);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // return created new user
  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

/**
 * Login Service
 */
const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("Invalid Credential!!", 400);

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw error("Invalid Credential!!", 400);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};
