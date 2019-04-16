const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const picsSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Pics = mongoose.model('Pics', picsSchema);
module.exports = Pics;

