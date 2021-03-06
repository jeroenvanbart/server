const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const SALT_ROUNDS = 10;

// require the user model !!!!
const User = require("../models/user-model");

authRoutes.post("/signup", (req, res, next) => {
  const { username, email, password, profileImg } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ message: "Fill out all fields" });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).json({
      message:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  User.findOne({ email }).then((userResult) => {
    if (userResult) {
      res.status(400).json({
        message: "Email already exists",
      });
      return;
    }
    bcrypt
      .genSalt(SALT_ROUNDS)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username,
          email,
          password: hashedPassword,
          profileImg,
        });
      })
      .then((userFromDB) => {
        console.log("Newly created user is: ", userFromDB);

        const { _id, username, createdAt, updatedAt } = userFromDB;

        res.status(200).json({ _id, username, createdAt, updatedAt });
      })
      .catch((error) => {
        if (error.code === 11000) {
          res.status(500).json({
            message:
              "Username needs to be unique. Username has already been used.",
          });
        } else {
          next(error);
        }
      });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, (err) => {    
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res, next) => {

  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;
