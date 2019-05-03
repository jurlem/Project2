const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rentalSchema = new Schema({
  headline:  { type: String, required: true },
  shortText: { type: String, required: true },
  longText:  { type: String },
  address: String,
  lat: String,
  lng: String,
  link1:    String,
  link2:    String,
  contact: String
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Rental = mongoose.model('Rental', rentalSchema);
module.exports = Rental;
