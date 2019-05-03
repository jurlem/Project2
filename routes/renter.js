const express = require('express');
const passport = require('passport');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const User = require("../models/User");
const Docu = require('../models/docu');
const checkRoles = require('../models/checkRoles');
const nodemailer = require('nodemailer')


// set up transporter:
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS
  }
});

//renter Pages:
router.get('/', checkRoles('RENTER'), (req, res, next) => {
  res.render('renter-view' , { username: req.user.username });
})
router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  res.render('nodemailer-message', { email, subject, message })

transporter.sendMail({
  from: 'no-reply <no-reply@project2.com>',
  to: 'jurlemjurlem@gmail.com', 
  subject: 'Email from the Rental Property Platform ',
  text: `<b>${message}</b>`,
  html: `<b>${message}</b>`
})
.then(info => res.render('message', {email, subject, message, info}))
.catch(error => console.log(error));
});



// // POST /message/add
// router.post('/add', (req, res) => {
//   Message.create({
//     title: req.body.title,
//     body: req.body.body
//   })
//   .then(message => {
//     transport.sendMail({
//       from: "no-reply <no-reply@ironhack.com>",
//       to: "jorg.vanderham@ironhack.com",
//       subject: "the subject",
//       text: `a new message has been posted: ${message}`
//     })
//     res.send(message)
//   })
//   .catch(err => {
//     console.log(err);
//   })

// })

module.exports = router;
