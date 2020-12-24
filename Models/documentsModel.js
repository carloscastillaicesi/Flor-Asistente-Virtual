const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentsSchema = new Schema({
 _id: {
  type: String,
  required: true,
 }, uId: {
  type: String
 },
 categorias: {
  type: Array
 },
 url: {
  type: String
 },
 nombre: {
  type: String
 }
}, { timestamps: true });

/**
 * This issue is probably coming from the fact that you are creating a mongoose model without specifying the name of the collection.
 * const Model = mongoose.model("Model", fileSchema, "NameOfCollection");
 */
const Documents = mongoose.model('Documents', documentsSchema, 'Documents');

module.exports = Documents;
