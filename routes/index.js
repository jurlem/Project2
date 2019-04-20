const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');


/* GET home page */
//homepage is the default login page
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

