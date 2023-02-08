const express = require("express");

const router = express.Router();
const { getArticle } = require("../../controllers/articlesController.js");

router.route("/:id").get(getArticle);

module.exports = router;
