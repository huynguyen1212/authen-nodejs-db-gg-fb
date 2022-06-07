const express = require("express");
const router = express.Router();
const post = require("../model/post");
const bcryptjs = require("bcryptjs");
const passport = require("passport");

router.get("", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { logged: true });
  } else {
    res.render("index", { logged: false });
  }
});

module.exports = router;
