const express = require('express');
const passport = require('passport');
const router = express.Router();
const Multer = require('multer');
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Invoice = require('../models/Invoice');
const Docu = require('../models/Docu');
const Rental = require("../models/Rental");
const checkRoles = require('../models/checkRoles');
//s3
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const storage = new multerS3({
  s3: s3,
  bucket: 'jurlem-project2',
  contentDisposition: 'inline',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})
// end s3
//PRIVATE Pages:
router.get('/', (req, res) => {
  res.render('admin-view', {
    username: req.user.username
  });
})

// //ADMIN tabs:

router.get('/documents', (req, res, next) => {
  Docu.findOne({ rentalId: req.query.id })
    .then(result => {
      console.log(result)
      res.render('fileuploads/documents-view', {id: req.query.id});
    })
    .catch(err => {
      console.log(err)
    })
})


// MULTER
const upload2 = Multer({ storage: storage })

router.post('/documents', upload2.single('Docu'), (req, res, next) => {
  console.log('console logging ', req.files)
  let correctId = "";
  Rental.findByIdAndUpdate({_id: req.query.id}, req.body)
    .then(value => {
      correctId = value;
      return Docu.create({
        name: req.body.name,
        path: file.location,
        originalName: file.originalname,
        rentalId: req.query.id
      })
      .then(result => {
        res.redirect(`/manage/documents?id=${correctId._id}`)
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
})


