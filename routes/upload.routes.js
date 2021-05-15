const { Router } = require("express");
const router = Router();
const User = require("../models/user-model");

const fileUploader = require("../configs/cloudinary.config");

/* POST - upload images   */
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
});


router.put("/profile/:id/upload", fileUploader.single("profileImg"), (req, res, next) => {
  const { id } = req.params;
  const { path } = req.file; 
  User.findByIdAndUpdate(id, { profileImg: path })
    .then(() => {
      res.status(200).json({ cloudinaryUrl: req.file.path });
    })
    .catch((error) => {
      res.status(500).json(error);
      next(err);
    });
});


module.exports = router;
