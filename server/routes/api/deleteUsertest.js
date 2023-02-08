const express = require("express");
const ROLES_LIST = require("../../config/roles_list");
const usersController = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");

const router = express.Router();

router
  .route("/:id")
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

module.exports = router;
