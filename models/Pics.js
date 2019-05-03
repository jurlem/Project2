const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const picsSchema = new Schema({
  name: String,
  path: String,
  originalName: String,
  rentalId: { type : Schema.Types.ObjectId, ref: 'Rental' },
  frontPage: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Pics = mongoose.model('Pics', picsSchema);
module.exports = Pics;

