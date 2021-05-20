const { Router } = require("express");
const router = Router();
const User = require("../models/user-model");

const fileUploader = require("../configs/cloudinary.config");


router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
});

router.post("/upload/profile", fileUploader.single("profileImg"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
});


router.post("/profile/:id/upload", fileUploader.single("profileImg"), (req, res, next) => {
      res.status(200).json({ cloudinaryUrl: req.file.path });
});


module.exports = router;
