const express = require('express');
const passport = require('passport');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");

const User = require("../models/User");


//PRIVATE Pages:
router.get('/', checkRoles('ADMIN'), (req, res) => {
  res.render('admin-view', { user: req.user });
})

// !! kui panen siia  *, siis ei näe admin enam oma edasisi lehti. ja ka ei pääse Renter sinna
// kui tärni ei pane, siis  Ei näe / kuid edasisi lehti näevad kõik

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login')
    }
  }
}

// //ADMIN tabs:
router.get('/documents', checkRoles('ADMIN'), (req, res, next) => {
  res.render('documents-view', { user: req.user });
})
router.get('/arved', checkRoles('ADMIN'), (req, res, next) => {
  res.render('arved-view', { user: req.user });
})
router.get('/createuser', checkRoles('ADMIN'), (req, res, next) => {
  res.redirect('auth/signup', { user: req.user });
})
router.get('/manageAdd', checkRoles('ADMIN'), (req, res, next) => {
  res.render('manageAdd-view', { user: req.user });
})

module.exports = router;
