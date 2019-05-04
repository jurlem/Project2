const express = require('express');
const passport = require('passport');
const router = express.Router();
const Multer = require('multer');
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Invoice = require('../models/Invoice');
const Docu = require('../models/docu');
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

router.post('/documents', upload2.single('docu'), (req, res, next) => {
  console.log('console logging ', req.file)
  let correctId = "";
  Rental.findByIdAndUpdate({_id: req.query.id}, req.body)
    .then(value => {
      correctId = value;
      console.log('consoleLOGGING VALUE', correctId)
      return Docu.create({
        name: req.body.name,
        path: req.file.location,
        originalName: req.file.originalname,
        rentalId: req.query.id
      })
    })
    .then(() => {
      console.log('consoleLOGGING RESULT ', correctId)
        res.redirect(`/forrental/documents?id=${correctId._id}`)
      })
      .catch(err => {
        console.log(err)
      })
    .catch(err => {
      console.log(err)
    })
})


//choosing one file:
router.get('/documents/:docId', (req, res, next) => {

  Docu.findOne({
      _id: req.params.docId
    })
    .then(fetchedDoc => {
      console.log('The fetched document: ', fetchedDoc)
      res.render('fileuploads/more', {
        fetchedDoc,
        username: req.user.username
      })
    })
})

//DELETE ADD
router.get('/delete', (req, res) => {
  console.log(req.query)
  Docu.findByIdAndDelete({
      _id: req.query.id
    })
    .then(deletedDocu => {
      console.log('Im deleting this document: ', deletedDocu)
      res.redirect('/manage/documents', {
        username: req.user.username
      })
    })
    .catch(err => {
      console.log(err)
    })
})


// //ARVED tabs:
router.get('/arved', (req, res, next) => {
  Invoice.find()
    .then(invoices => {
      console.log('invoices: ', invoices)
      res.render('fileuploads/arved-view', {
        invoices: invoices,
        username: req.user.username
      });
    })
    .catch(err => {
      console.log(err)
    })
})

// const upload1 = Multer({ storage: storage })


// // upload file to DB, then render page with documents
// router.post('/arved', upload1.single('invoice'), (req, res) => {
// // console.log(req.file)
//  Invoice.create({
//   name: req.body.name ,
//   path: req.file.location,
//   originalName: req.file.originalname,
//   type: "invoice"
// })
//   .then(invoices => {
//     res.redirect('/manage/arved', {username: req.user.username})
//   })
//   .catch(err =>{
//     console.log(err)
//   })
// })


//*********

//Comment out to see if there was a typo:
//INVOICES VIEW,  CREATE new INVOICE
// router.get('/arved', (req, res, next) => {
//   Docu.find({})
//     .then(invoices => {
//       console.log('list of invoices: ', {invoices:invoices})
//       res.render('fileuploads/arved-view'), {invoices: invoices};
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

// router.post('/arved', upload.single('docu'), (req, res) => {
//   // console.log(req.file)
//   Docu.create({
//     name: req.body.name , 
//     path: req.file.location ,
//     originalName: req.file.originalname,
//     type: "invoice"
//   })
//   .then(invoice => {
//     res.redirect('/manage/arved')
//   })
//   .catch(err => {
//     console.log(err)
//   })
// })



router.get('/createuser', (req, res, next) => {
  res.redirect('auth/signup', {
    username: req.user.username
  });
})
router.get('/manageAdd', (req, res, next) => {
  res.render('manageAdd-view', {
    username: req.user.username
  });
})

module.exports = router;