
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const testdocuSchema = new Schema({
  name: String,
  path: String,
  originalName: String,
  type: String,
  rentalId: { type : Schema.Types.ObjectId, ref: 'Rental' }

}, {
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
  }
});

const Testdocu = mongoose.model("Testdocu", testdocuSchema);
module.exports = Testdocu;