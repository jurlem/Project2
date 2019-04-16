const mongoose = require("mongoose");

Pics = require("../models/Pics");

mongoose.connect('mongodb://localhost/project2')

const pics = [
      {
        'photo'  :'../images/flatPics/lounge.jpg',
        'text' : 'Jahu flat',
        'frontPage' : 'true' 
      },
      {
        'photo'  : '../images/flatPics/kitchen.JPG',
        'text' : 'The kitchen',
        'frontPage' : 'true' 
      },
      {
        'photo'  : '../images/flatPics/bed.JPG',
        'text' : 'The bed',
        'frontPage' : 'true' 
      },
    ]
  
Pics.create(pics)
    .then(result => {
        console.log(result)
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    })

    //And then run the following code (to update the db):
    // $ node bin/images_seeds.js 