const express = require('express');
const router  = express.Router();

const User = require("../models/user-model");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});



module.exports = router;
