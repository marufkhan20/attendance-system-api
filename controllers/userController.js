const authServices = require("../services/authServices");
const userService = require("../services/userServices");
const error = require("../utils/error");

/**
 * Get All Users
 */
const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select properties
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * Get User By ID
 */
const getUserByID = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.findUserByProperty("_id", userId);

    if (user) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(404).json({ message: "User not found!!" });
  }
};

/**
 * Create New User
 */
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data!!" });
  }

  try {
    // create new user by (authServices) register service
    const user = await authServices.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    // response success message with created user
    res.status(201).json({ message: "User Created Successfully!", user });
  } catch (err) {
    next(err);
  }
};

/**
 * Update User By ID (PUT)
 */
const putUserByID = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) throw error("User not found!!", 404);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Update User By ID (PATCH)
 */
const patchUserByID = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) throw error("User not found!", 404);

    // udpate user object
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    // save updated user object
    await user.save();

    res.status(200).json({ message: "User Updated Successfully!!", user });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete User By ID
 */
const deleteUserByID = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found!!", 404);
    }

    /**
     * TODO: Delete Associated Data
     */

    // Delete User
    user = await user.delete();

    res.status(203).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserByID,
  getUsers,
  postUser,
  putUserByID,
  patchUserByID,
  deleteUserByID,
};
