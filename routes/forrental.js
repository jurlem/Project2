const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");

//GET Step1
router.get('/step1', (req, res, next) => {
  res.render('forrental/step1');
});
//POST Step1
router.post('/step1', (req, res, next) => {
  Rental.create(req.body)
    .then( insertedInfo =>{
      console.log(insertedInfo)
      res.redirect('forrental/step2')
    })
    .catch(err =>
      console.log(err))
      res.redirect('/step1', { error: err}) 

  //create document in DB with only the info from step 1. 
  //inside error redirect to same page with error message  
  //redirect to step 2
})

//GET Route for Step2
router.get('/step2', (req, res, next) => {
  res.render('forrental/step2');
});
router.post('/step2', (req, res, next) => {
  Rental.update(req.body)
    .then( insertedInfo =>{
      console.log(insertedInfo)
      res.redirect('forrental/step3')
    })
    .catch(err =>
      console.log(err))
      res.redirect('/step2', { error: err}) 







router.get('/step2', (req, res, next) => {
  res.render('forrental/step2');
});

//POST Route for Step2
router.post('/step2', (req, res, next) => {
  //Update document that you created in step 1 with the images from the file upload.  
})





module.exports = router;