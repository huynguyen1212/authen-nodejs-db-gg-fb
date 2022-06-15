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

//

router.get("/detail/:id", async (req, res) => {
  const id = req.params.id.split("=")[1];
  let postByID;
  try {
    postByID = await post.findById(id);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something wrong");
    res.redirect("/");
  }

  if (req.isAuthenticated()) {
    res.render("new-detail", {
      postByID: postByID,
      logged: true,
      csrfToken: req.csrfToken(),
    });
  } else {
    res.render("new-detail", {
      postByID: postByID,
      logged: false,
      csrfToken: req.csrfToken(),
    });
  }
});

router.post("/detail/:id", async (req, res) => {
  const id = req.params.id.split("=")[1];
  const { des } = req.body;

  if (req.user.role === "admin") {
    if (!des) {
      res.status(500);
      res.send("Something wrong");
    } else {
      post.findByIdAndUpdate(id, { des: des }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.status(200);
          res.redirect("/");
        }
      });
    }
  }
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id.split("=")[1];

  if (req.user.role === "admin") {
    post.findByIdAndDelete(id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
        res.redirect("/");
      }
    });
  } else {
    res.status(500);
    res.send("Something wrong");
  }
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

module.exports = router;
