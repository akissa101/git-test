const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getUser,
} = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").get(verifyRoles(ROLES_LIST.Admin), getAllUsers);
//verifyRoles(ROLES_LIST.Admin),
//delete user,
router.route("/del/:id").delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

//get a single user
router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);
//verifyRoles(ROLES_LIST.Admin),

module.exports = router;
