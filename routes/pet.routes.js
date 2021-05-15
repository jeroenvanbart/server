const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Pet = require("../models/pet-model");
const User = require("../models/user-model");

// POST => Create new project
router.post("/pet", (req, res, next) => {
  const { name, imageUrl, bio, notes } = req.body;

  Pet.create({
    name,
    imageUrl,
    bio,
    notes,
    owner: req.user._id,
  })
    .then((createdPet) => {
      res.status(200).json(createdPet);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

// GET => Return all projects
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

// GET route => to get a specific project/detailed view
// router.get("/pet/:id", (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   // Our projects have array of tasks' ids and
//   // we can use .populate() method to get the whole task objects
//   Project.findById(id)
//     .populate("tasks")
//     .then((project) => {
//       res.status(200).json(project);
//     })
//     .catch((error) => {
//       res.json(error);
//       next(err);
//     });
// });

// // PUT route => to update a specific project
// router.put("/pet/:id", (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Project.findByIdAndUpdate(id, req.body)
//     .then(() => {
//       res.status(200).json({
//         message: `Project with ${id} is updated successfully.`,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//       next(err);
//     });
// });

// // DELETE route => to delete a specific project
// router.delete("/pet/:id", (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Project.findByIdAndRemove(id)
//     .then(() => {
//       res.json({
//         message: `Project with ${id} is removed successfully.`,
//       });
//     })
//     .catch((error) => {
//       res.json({ error, errorMessage: `Something went wrong` });
//     });
// });

module.exports = router;
