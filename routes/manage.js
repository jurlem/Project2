const express = require('express');
const passport = require('passport');
const router  = express.Router();
const multer  = require('multer');

const ensureLogin = require("connect-ensure-login");

const User = require("../models/User");
const Docu = require('../models/docu');



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
  res.render('fileuploads/documents-view');
  // Docu.find()
  //   .then(documents =>{
  //     res.render('fileuploads/documents-view', { user: req.user }, { documents: documents });
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })  
})
router.get('/arved', checkRoles('ADMIN'), (req, res, next) => {
  res.render('fileuploads/arved-view', { user: req.user });
})
router.get('/createuser', checkRoles('ADMIN'), (req, res, next) => {
  res.redirect('auth/signup', { user: req.user });
})
router.get('/manageAdd', checkRoles('ADMIN'), (req, res, next) => {
  res.render('manageAdd-view', { user: req.user });
})

// MULTER
// Multer GET - kas on vaja uut või saab kasutada seda checkRoles osa?

// Route to upload from project base path
const upload = multer({ dest: './public/uploads/' })

router.post('/documents', upload.single('docu'), (req, res) => {
console.log(req.file)
Docu.create({
  name: req.body.name ,
  path: `/uploads/${req.file.filename}`,
  originalName: req.file.originalname
})
  .then(document =>{
    res.send(document)
    
  })
  .catch(err =>{
    console.log(err)
  })
})


module.exports = router;
