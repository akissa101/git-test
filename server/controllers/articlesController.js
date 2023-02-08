const Article = require("../model/Artiicles.js");

const getArticles = async (req, res) => {
  const articles = await Article.find();
  if (!articles) return res.status(204).json({ message: "No articles found." });
  res.json(articles);
};

const getArticle = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ArticlesID required." });

  const article = await Article.findOne({ _id: req.params.id }).exec();
  if (!article) {
    return res
      .status(204)
      .json({ message: `No articlesmatches ID ${req.params.id}.` });
  }
  res.json(article);
};

const createNewArticle = async (req, res) => {
  if (!req?.body?.title || !req?.body?.content || !req?.body?.userid) {
    return res.status(400).json({ message: "All are required" });
  }

  try {
    const result = await Article.create({
      title: req.body.title,
      content: req.body.content,
      userid: req.body.userid,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateArticle = async (req, res) => {
  const { id } = req?.body;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const article = await Article.findOne({ _id: id }).exec();
  if (!article) {
    return res.status(204).json({ message: `No article matches ID ${id}.` });
  }
  if (req.body?.title) article.title = req.body.title;
  if (req.body?.content) article.content = req.body.content;
  if (req.body?.userid) article.userid = req.body.userid;
  const result = await article.save();
  res.json(result);
};

const deleteArticle = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ message: "ArticlesID required." });

  const article = await Article.findOne({ _id: id }).exec();
  if (!article) {
    return res.status(204).json({ message: `No articlesmatches ID ${id}.` });
  }
  const result = await article.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

module.exports = {
  getArticles,
  getArticle,
  createNewArticle,
  updateArticle,
  deleteArticle,
};
