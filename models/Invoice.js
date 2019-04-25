const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const invoiceSchema = new Schema({
  name: String,
  path: String,
  originalName: String

}, {
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;