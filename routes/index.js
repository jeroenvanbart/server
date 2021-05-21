const express = require("express");
const router = express.Router();

const User = require("../models/user-model");

router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  res.redirect(`/`);
});

module.exports = router;
