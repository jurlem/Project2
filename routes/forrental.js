const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const ensureLogin = require("connect-ensure-login")
// require RENTAL
const Rental = require("../models/Rental");


//GET Step1
router.get('/step1', (req, res, next) => {
  res.render('forrental/step1');
});
//POST Step1
router.post('/step1', (req, res, next) => {
  Rental.create(req.body)
    .then( insertedInfo =>{
      console.log(insertedInfo)
      // throw new Error('very bad error')
      res.redirect('/forrental/step2?id=' + insertedInfo._id) //full path in case of redirect!
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step1', { message: err}) 
    })
  })
  //create document in DB with only the info from step 1. 
  //inside error redirect to same page with error message  
  //redirect to step 2


//GET-POST Routes for Step2
router.get('/step2', (req, res, next) => {
  res.render('forrental/step2', {id: req.query.id});
});

router.post('/step2', (req, res, next) => {
  Rental.findByIdAndUpdate({_id: req.query.id}, req.body)
    .then( insertedInfo =>{
      console.log(insertedInfo)
      res.redirect('/forrental/step3?id=' + insertedInfo._id)
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step2', { message: err}) 
    })
  //Update document that you created in step 1 with the images from the file upload.  
})


//GET-POST Routes for Step3
router.get('/step3', (req, res, next) => {
  res.render('forrental/step3', {id: req.query.id});
});
router.post('/step3', (req, res, next) => {
  Rental.findByIdAndUpdate({_id: req.query.id}, req.body)
    .then( insertedInfo =>{
      console.log(insertedInfo)
      res.redirect('/forrental/step4?id=' + insertedInfo._id)
    })
    .catch(err => {
      console.log(err)
      res.render('forrental/step3', { message: err})
    })
 });


 //GET-POST Routes for Step4
router.get('/step4', (req, res, next) => {
  res.render('forrental/step4', {id: req.query.id});
});
router.post('/step4', (req, res, next) => {
  Rental.findOneAndUpdate({_id: req.query.id}, req.body)
    .then( links =>{
      console.log(links)
      res.redirect('/forrental/add?id=' + links._id)
    })
    .catch(err => {
      console.log(err)
      
      res.render('forrental/step4', { message: err})  
    })
 });


 // and all together THE ADD:
 router.get('/add', (req, res, next) => {
   Rental.find({})
   .then(theRentalAdd => {
     console.log( 'This is the RentalAdd in the DB: ', theRentalAdd )
     res.render('forrental/add', { add: theRentalAdd });
   })
   .catch(err => {
     console.log(err)
   });
});

//longText page
router.get('/moretext', (req, res, next) => {
  Rental.find({})
  .then(theRentalAdd => {
    res.render('forrental/moretext', { add: theRentalAdd })
  })
  .catch(err => {
    console.log(err)
  })
})

//
//EDIT existing add:
router.get('/all', (req, res, next) => {
  Rental.find( { } )
    .then(all => {
      res.render('forrental/all', {all})
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/edit', (req, res) => {
  Rental.findOne( {_id: req.query.id}, req.body )
    .then(getOne => {
      res.render('forrental/edit', getOne)
    })
    .catch(err =>
      console.log(err))
})



router.post('/edit', (req, res) => {
  Rental.update( {_id: req.query.id}, req.body )
    .then(add => {
      res.redirect('/forrental/add')
    })
    .catch(err => {
      console.log(err)
    })
})


//DELETE ADD
router.get('/delete', (req, res) => {
  Rental.findByIdAndDelete( {_id:req.query.id} )
  .then(deletedMessage => {
    console.log('Im deleting this message: ', deletedMessage)
    res.redirect('/forrental/all')
  })
  .catch(err => {
    console.log(err)
  })
})

//view full add {{id}}
router.get('/view', (req, res) => {
  
  Rental.findOne( {_id:req.query.id} )
   .then(foundAdd => {
     console.log('this is a add: ', foundAdd)
     res.render('forrental/viewfull', {foundAdd})
   })
   .catch(err => {
     console.log(err)
   })
})



module.exports = router;

