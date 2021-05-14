const express = require("express");
const mongoose = require("mongoose");
const { findById } = require("../models/user-model");
const router = express.Router();

const User = require("../models/user-model");

// router.get("/profile", (req, res, next) => {
//   User.find().then((data) => {
//     res.status(200).json(data);
//     return;
//   }).catch((err) => {
//     res.status(500).json(err);
//     next(err);
//   });
// });

router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    res.json(error);
    next(err);
  });
})  




module.exports = router;
