const express = require('express');
const passport = require('passport');
const router  = express.Router();
const Multer  = require('multer');
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Docu = require('../models/docu');
const Invoice = require('../models/Invoice');

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

  key: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})
// end s3

//PRIVATE Pages:
router.get('/', (req, res) => {
  res.render('admin-view', { user: req.user });
}) 

// //ADMIN tabs:
router.get('/documents', (req, res, next) => {  
  Docu.find({})
    .then(documents =>{
       console.log('documents: ', documents)
      res.render('fileuploads/documents-view', { documents: documents });
    })
    .catch(err => {
      console.log(err)
    })  
})

// MULTER
// Route to upload from project base path
const upload = Multer({ storage: storage })


// upload file to DB, then render page with documents
router.post('/documents', upload.single('docu'), (req, res) => {
// console.log(req.file)
 Docu.create({
  name: req.body.name ,
  path: req.file.location,
  originalName: req.file.originalname,
  type: "document"
})
  .then(documents => {
    res.redirect('/manage/documents')
  })
  .catch(err =>{
    console.log(err)
  })
})


//choosing one file:
router.get('/documents/:docId', (req, res, next)  => {

  Docu.findOne( { _id: req.params.docId } )
    .then( fetchedDoc => {
      console.log ('The fetched document: ', fetchedDoc )
      res.render('fileuploads/more', {fetchedDoc})
    })
})

//DELETE ADD
router.get('/delete', (req, res) => {
  console.log(req.query)
  Docu.findByIdAndDelete( {_id:req.query.id} )
  .then(deletedDocu => {
    console.log('Im deleting this document: ', deletedDocu)
    res.redirect('/manage/documents')
  })
  .catch(err => {
    console.log(err)
  })
})


//INVOICES VIEW,  CREATE new INVOICE
router.get('/arved', (req, res, next) => {
  Docu.find({})
    .then(invoices => {
      console.log('list of invoices: ', {invoices:invoices})
      res.render('fileuploads/arved-view'), {invoices: invoices};
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/arved', upload.single('docu'), (req, res) => {
  // console.log(req.file)
  Docu.create({
    name: req.body.name , 
    path: req.file.location ,
    originalName: req.file.originalname,
    type: "invoice"
  })
  .then(invoice => {
    res.redirect('/manage/arved')
  })
  .catch(err => {
    console.log(err)
  })
})


// router.post('/documents', upload.single('docu'), (req, res) => {
//   // console.log(req.file)
//    Docu.create({
//     name: req.body.name ,
//     path: req.file.location,
//     originalName: req.file.originalname
//   })
//     .then(documents => {
//       res.redirect('/manage/documents')
//     })
//     .catch(err =>{
//       console.log(err)
//     })
//   })



router.get('/createuser', (req, res, next) => {
  res.redirect('auth/signup', { user: req.user });
})
router.get('/manageAdd', (req, res, next) => {
  res.render('manageAdd-view', { user: req.user });
})

module.exports = router;
