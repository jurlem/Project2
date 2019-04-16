// const express = require('express');
// const passport = require('passport');
// const router  = express.Router();
// const ensureLogin = require("connect-ensure-login");

// const User = require("../models/User");
// const Text = require('../models/Rental.js')


// router.get('/', (req, res, next) => {
//   Text.find()
//     .then(shortMessage => {
//       console.log(shortMessage);
//       res.render('for-rent', {shortText: shortMessage})
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

// router.get('/moreInfo', (req, res, next) => {
//   res.render('more-info');
// })

// router.get('/morePics', (req, res, next) => {
//   res.render('more-pics');
// })



// module.exports = router;

// // second page is the add:
// // router.get('/jahu', (req, res, next) => {
// //   const pics = [
// //     {
// //       'photo'  :'../images/flatPics/lounge.jpg',
// //       'text' : 'Jahu flat',
// //       'frontPage' : 'true' 
// //     },
// //     {
// //       'photo'  : '../images/flatPics/kitchen.JPG',
// //       'text' : 'The kitchen',
// //       'frontPage' : 'true' 
// //     },
// //     {
// //       'photo'  : '../images/flatPics/bed.JPG',
// //       'text' : 'The bed',
// //       'frontPage' : 'true' 
// //     },
// //   ]

// //   res.render('for-rent', {pics});
// // })