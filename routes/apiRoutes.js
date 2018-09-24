const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../models");

router.get("/saved", function (req, res) {
  db.Article.find({})
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/saved", function (req, res) {
  const newArticle = {
    title: req.body.title,
    url: req.body.url,
    date: req.body.date
  };
  db.Article.create(newArticle)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.delete("/saved/:id", function (req, res) {
  console.log("Deleting id " + req.params.id);
  db.Article.remove({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
