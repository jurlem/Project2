const express = require('express');
const router = express.Router();
const multer = require('multer');
const ensureLogin = require("connect-ensure-login")
const Rental = require("../models/Rental");
const Pics = require('../models/Pics');
const Docu = require('../models/docu');
const Testdocu = require('../models/Testdocu');


//s3
const Multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const s3 = new aws.S3();

// this bucket is for images upload
const storage = new multerS3({
  s3: s3,
  bucket: 'jurlem-project2',
  // contentDisposition: 'inline',
  // contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})
// end s3

//GET Step1
router.get('/step1', (req, res, next) => {
  res.render('forrental/step1', {
    username: req.user.username
  });
});

//POST Step1
router.post('/step1', (req, res, next) => {
  Rental.create(req.body)
    .then(insertedInfo => {
      console.log(insertedInfo)
      // throw new Error('very bad error')
      res.redirect('/forrental/step2?id=' + insertedInfo._id) //full path in case of redirect!
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step1', {
        message: err
      })
    })
})

//GET-POST Routes for Step2
router.get('/step2', (req, res, next) => {
  res.render('forrental/step2', {
    id: req.query.id,
    username: req.user.username
  });
});

//  // MULTER
const upload = Multer({
  storage: storage
})

router.post('/step2', upload.array('Pics', 3), (req, res, next) => {
  //console.log('console logging ', req.files)
  let correctId = "";
  Rental.findByIdAndUpdate({
      _id: req.query.id
    }, req.body)
    .then(value => {
      correctId = value;
      let picsArry = req.files.map(file => {
        return Pics.create({
          name: req.body.name,
          path: file.location,
          originalName: file.originalname,
          rentalId: req.query.id,
          frontPage: true
        })
      })
      return Promise.all(picsArry)
        .then(() => {
          console.log('CONSOLE LOGGING', correctId)
          res.redirect("/forrental/step2b?id=" + correctId._id)
        })
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step2', {
        message: err
      })
    })
})

//GET-POST to Gallery photos, step 2b:
router.get('/step2b', (req, res, next) => {
  res.render('forrental/step2b', {
    id: req.query.id,
    username: req.user.username
  });
});
//  // MULTER
const upload2 = Multer({
  storage: storage
})

router.post('/step2b', upload2.array('Pics', 10), (req, res, next) => {
  let correctId = "";
  Rental.findByIdAndUpdate({
      _id: req.query.id
    }, req.body)
    .then(value => {
      correctId = value
      let galleryArray = req.files.map(file => {
        return Pics.create({
          name: req.body.name,
          path: file.location,
          originalName: file.originalname,
          rentalId: req.query.id,
          frontPage: false
        })
      })
      return Promise.all(galleryArray)
    })
    .then(() => {
      console.log(correctId)
      res.redirect('/forrental/step3?id=' + correctId._id)
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step2b', {
        message: err,
        username: req.user.username
      })
    })
})



//GET-POST Routes for Step3
router.get('/step3', (req, res, next) => {
  res.render('forrental/step3', {
    id: req.query.id,
    username: req.user.username
  });
});
router.post('/step3', (req, res, next) => {
  Rental.findByIdAndUpdate({
      _id: req.query.id
    }, req.body)
    .then(insertedInfo => {
      console.log(insertedInfo)
      res.redirect('/forrental/step4?id=' + insertedInfo._id)
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step3', {
        message: err
      })
    })
});


//GET-POST Routes for Step4
router.get('/step4', (req, res, next) => {
  res.render('forrental/step4', {
    id: req.query.id,
    username: req.user.username
  });
});
router.post('/step4', (req, res, next) => {
  Rental.findOneAndUpdate({
      _id: req.query.id
    }, req.body)
    .then(links => {
      console.log(links)
      res.redirect('/forrental/view?id=' + links._id)
    })
    .catch(err => {
      console.log(err)

      res.render('forrental/step4', {
        message: err
      })
    })
});


// and all together THE ADD:
router.get('/add', (req, res, next) => {
  Rental.find({})
    .then(theRentalAdd => {
      console.log('This is the RentalAdd in the DB: ', theRentalAdd)
      res.render('forrental/add', {
        add: theRentalAdd,
        username: req.user.username
      });
    })
    .catch(err => {
      console.log(err)
    });
});

//longText page
router.get('/moretext', (req, res, next) => {
  Rental.findOne({
      _id: req.query.id
    })
    .then(theRentalAdd => {
      res.render('forrental/moretext', {
        theRentalAdd
      })
    })
    .catch(err => {
      console.log(err)
    })
})

//GALLERY page
router.get('/moreimage', (req, res) => {
  Rental.findOne({
      _id: req.query.id
    })
    .then(foundAdd => {
      return Pics.find({
          rentalId: req.query.id        })
        .then(pics => {
          //foundAdd = foundAdd
          console.log('CONSOLE LOGGING PICS', pics)
          console.log('console logging the foundADD ', foundAdd)

          res.render('forrental/moreimage', {
            foundAdd,
            pics
          })
        })
    })
    .catch(err => {
      console.log(err)
    })
})


//
//EDIT existing add:
router.get('/all', (req, res, next) => {
  Rental.find({})
    .then(all => {
      res.render('forrental/all', {
        all,
        username: req.user.username
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/edit', (req, res) => {
  Rental.findOne({
      _id: req.query.id
    }, req.body)
    .then(getOne => {
      res.render('forrental/edit', getOne)
    })
    .catch(err =>
      console.log(err))
})

router.post('/edit', (req, res) => {
  console.log(req.body)
  Rental.findByIdAndUpdate({
      _id: req.query.id
    }, req.body)
    .then(add => {
      res.redirect('/forrental/view?id=' + add._id)
    })
    .catch(err => {
      console.log(err)
    })
})

//DELETE ADD
router.get('/delete', (req, res) => {
  Rental.findByIdAndDelete({
      _id: req.query.id
    })
    .then(deletedMessage => {
      console.log('Im deleting this message: ', deletedMessage)
      res.redirect('/forrental/all')
    })
    .catch(err => {
      console.log(err)
    })
})

//view full add per {{id}}
router.get('/view', (req, res) => {
  Rental.findOne({
      _id: req.query.id
    })
    .then(foundAdd => {
      return Pics.find({
          rentalId: req.query.id,
          frontPage: true
        })
        .then(pics => {
          //foundAdd = foundAdd
          console.log('CONSOLE LOGGING PICS', pics)
          console.log('console logging the foundADD ', foundAdd)

          res.render('forrental/viewfull', {
            foundAdd,
            pics
          })
        })
    })
    .catch(err => {
      console.log(err)
    })
})

// testin siin docut
// **************************

router.get('/documents', (req, res) => {
  Rental.findOne({
      _id: req.query.id
    })
    .then(foundAdd => {
      return Testdocu.find({
          rentalId: req.query.id
        })
        .then(foundDocs => {
          console.log('Founddocs', foundDocs)
          console.log('FoundADD ', foundAdd)

          res.render('fileuploads/documents-view', {
            foundAdd,
            foundDocs
          })
        })
    })
    .catch(err => {
      console.log(err)
    })
})

// MULTER
const upload3 = Multer({
  storage: storage
})

router.post('/documents', upload3.single('Testdocu'), (req, res, next) => {

  let correctId = "";
  
  Rental.findByIdAndUpdate({
      _id: req.query.id
    }, req.body)
    .then(value => {
      correctId = value;
      console.log('consoleLOGGING VALUE', correctId)
      return Testdocu.create({
        name: req.body.name,
        path: req.file.location,
        originalName: req.file.originalname,
        rentalId: req.query.id
      })
      .then(() => {
        console.log('consoleLOGGING RESULT ', correctId)
        res.redirect(`/forrental/documents?id=${correctId._id}`)
      })
    })
    .catch(err => {
      
      console.log(err)
    })
})




module.exports = router;