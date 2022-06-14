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

router.post("/detail", async (req, res) => {
  const posts = await post.findById(req.body.id);
  if (req.isAuthenticated()) {
    res.render("new-detail", { logged: true, csrfToken: req.csrfToken() });
  } else {
    res.render("new-detail", { logged: false, csrfToken: req.csrfToken() });
  }
});

router.delete("new/delete/:id", (req, res) => {
  console.log("req: ", req);
});

router.post("/new", async (req, res) => {
  const { des } = req.body;

  //find all
  const checkUser = await user.find({});

  if (req.user.role === "admin") {
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
  }
});

router.put("/update", async (req, res) => {
  const { des } = req.body;

  //find all
  const checkUser = await user.find({});

  if (req.user.role === "admin") {
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
  }
});

module.exports = router;
