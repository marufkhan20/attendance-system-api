const router = require("express").Router();
const userController = require("../controllers/userController");

/**
 * Get user by id or email
 * @route /api/v1/users/userId
 * @method GET
 * @visibility PRIVATE
 */
router.get("/:userId", userController.getUserByID);

/**
 * update user by id
 * @route /api/v1/users/userId
 * @method PUT
 * @visibility PRIVATE
 */
router.put("/:userId", userController.putUserByID);

/**
 * update user by id
 * @route /api/v1/users/userId
 * @method PATCH
 * @visibility PRIVATE
 */
router.patch("/:userId", userController.patchUserByID);

/**
 * delete user by id
 * @route /api/v1/users/userId
 * @method DELETE
 * @visibility PRIVATE
 */
router.delete("/:userId", userController.deleteUserByID);

/**
 * Get all users, include
 * - filter
 * - pagination
 * - sort
 * - select properties
 * @route /api/v1/users?sort=['by', 'name']
 * @method GET
 * @visibility PRIVATE
 */
router.get("/", userController.getUsers);

/**
 * Create a new user
 * @route /api/v1/users
 * @method POST
 * @visibility PRIVATE
 */
router.post("/", userController.postUser);

module.exports = router;
