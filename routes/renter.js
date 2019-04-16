const express = require('express');
const passport = require('passport');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");

const User = require("../models/User");


//renter Pages:


router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('renter-view', { user: req.user });
})


module.exports = router;
