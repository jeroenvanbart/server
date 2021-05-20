const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Pet = require("../models/pet-model");
const User = require("../models/user-model");

// POST => Create new project
router.post("/pet", (req, res, next) => {
  const { name, imageUrl, bio, notes, pettype, id } = req.body;

  Pet.create({
    name,
    imageUrl,
    bio,
    notes,
    pettype,
    owner: id,
  })
    .then((createdPet) => {
      res.status(200).json(createdPet);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});


router.get("/pet", (req, res, next) => {
  Pet.find()
    .then((allpets) => {
      res.status(200).json(allpets);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.get("/:id/ownpets", (req, res, next) => {
    const {id} = req.params;
    Pet.find({owner: id})
      .then((ownpets) => {
        res.status(200).json(ownpets);
      })
      .catch((err) => {
        res.status(500).json(err);
        next(err);
      });
  });
  
  router.delete("/pet/:id", (req, res, next) => {
    const { id } = req.params;
  
    Pet.findByIdAndRemove(id)
      .then(() => {
        res.json({
          message: `Pet ${id} is removed successfully.`,
        });
      })
      .catch((error) => {
        res.json({ error, errorMessage: `Something went wrong` });
      });
  });
  


module.exports = router;
