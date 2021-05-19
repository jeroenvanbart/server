const express = require("express");
const mongoose = require("mongoose");
const { findById } = require("../models/user-model");
const router = express.Router();
const nodemailer = require('nodemailer')

const User = require("../models/user-model");

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

router.get("/users", (req, res, next) => {
  User.find()
  .then((allUsers) => {
    res.status(200).json(allUsers);
  })
  .catch((error) => {
    res.json(error);
    next(err);
  });
})  

router.post('/send-email', (req, res, next) => {
  let {user} = req;
  let { email, subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PSWRD
    }
  });
  transporter.sendMail({
    from: '"Pawtel" <paw@hotel.com>',
    to: email, 
    replyTo: user.email,
    subject: subject, 
    text: message,
  })
  .then(info => res.status(200).render('contact/message', {email, subject, message, info}))
  .catch(error => console.log(error));
});



module.exports = router;
