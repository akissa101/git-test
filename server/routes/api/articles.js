const express = require("express");
const router = express.Router();
const {
  createNewArticle,
  updateArticle,
  deleteArticle,
} = require("../../controllers/articlesController.js");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewArticle)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateArticle);

router.route("/del/:id").delete(verifyRoles(ROLES_LIST.Admin), deleteArticle);

module.exports = router;
