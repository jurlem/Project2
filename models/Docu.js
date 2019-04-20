
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const docuSchema = new Schema({
  name: String,
  path: String,
  originalName: String

}, {
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
  }
});

const Docu = mongoose.model("Docu", docuSchema);
module.exports = Docu;