const express = require("express");
const router = express.Router();
const post = require("../model/post");
const user = require("../model/user");
const bcryptjs = require("bcryptjs");

router.get("", (req, res) => {
  res.render("index", { csrfToken: req.csrfToken() });
});

router.get("/new", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("new-post", { logged: true, csrfToken: req.csrfToken() });
  } else {
    res.render("new-post", { logged: false, csrfToken: req.csrfToken() });
  }
});

router.post("/new", (req, res) => {
  const { des } = req.body;
  console.log("user: ", user);
  if (!des) {
    res.render("new-post", {
      err: "Fields Required !",
      csrfToken: req.csrfToken(),
    });
  } else {
    bcryptjs.genSalt(12, (err, salt) => {
      if (err) throw err;
      post({
        des: des,
      }).save((err, data) => {
        if (err) throw err;
        res.redirect("/");
      });
    });
  }
});

module.exports = router;
