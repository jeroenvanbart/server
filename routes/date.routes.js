const express = require("express");
const mongoose = require("mongoose");
const Dates = require("../models/date-model");
const router = express.Router();

router.post("/:id/avdate", (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const { avdatestart, avdateend, needdatestart, needdateend } = req.body;

  Dates.create({
    avdatestart,
    avdateend,
    needdatestart,
    needdateend,
    owner: id,
  })
    .then((createdate) => {
      res.status(200).json(createdate);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

module.exports = router;
