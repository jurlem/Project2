const express = require('express');
const passport = require('passport');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const User = require("../models/User");
const Docu = require('../models/docu');
const checkRoles = require('../models/checkRoles');




//renter Pages:


router.get('/*', checkRoles('ADMIN'), (req, res, next) => {
  res.render('renter-view');
})

module.exports = router;
