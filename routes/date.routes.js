const express = require("express");
const mongoose = require("mongoose");
const NeedDates = require("../models/date-model");
const AvDates = require("../models/avdate-model");
const router = express.Router();

router.post("/:id/needdate", (req, res, next) => {
  const { id } = req.params;
  const { needdatestart, needdateend } = req.body;

  NeedDates.create({
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

router.post("/:id/avdate", (req, res, next) => {
  const { id } = req.params;
  const { avdatestart, avdateend } = req.body;

  AvDates.create({
    avdatestart,
    avdateend,
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

router.get("/:id/avdate", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  AvDates.find({ owner: id })
    .then((AllDates) => {
      res.status(200).json(AllDates);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.get("/:id/needdate", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  NeedDates.find({ owner: id })
    .then((AllDates) => {
      res.status(200).json(AllDates);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.get("/:id/allavdate", (req, res, next) => {
  const { id } = req.params;
  AvDates.find({ owner: { $ne: id } })
    .then((AllDates) => {
      res.status(200).json(AllDates);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.get("/:id/allneeddate", (req, res, next) => {
  const { id } = req.params;
  NeedDates.find({ owner: { $ne: id } })
    .then((AllDates) => {
      res.status(200).json(AllDates);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.delete("/needdate/:id", (req, res, next) => {
  const { id } = req.params;

  NeedDates.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: `Date ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json({ error, errorMessage: `Something went wrong` });
    });
});

router.delete("/avdate/:id", (req, res, next) => {
  const { id } = req.params;

  AvDates.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: `Date ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json({ error, errorMessage: `Something went wrong` });
    });
});


module.exports = router;
