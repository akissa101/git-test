const express = require("express");

const router = express.Router();
const {
  getArticles,
  getArticle,
} = require("../../controllers/articlesController.js");

router.route("/").get(getArticles);
router.route("/:id").get(getArticle);

module.exports = router;
