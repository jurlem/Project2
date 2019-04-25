const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rentalSchema = new Schema({
  headline:  { type: String, required: true },
  shortText: { type: String, required: true },
  longText:  { type: String },
  image1:  String,
  image2:  String,
  image3: String,
  image4: String,
  image5: String,
  image6: String,
  image7: String,
  image8: String,
  image9: String,
  image10: String,
  image11: String,
  image12: String,
  image13: String,
  address: String,
  link1:    String,
  link2:    String
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Rental = mongoose.model('Rental', rentalSchema);
module.exports = Rental;
