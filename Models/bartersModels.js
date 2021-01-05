const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BartersSchema = new Schema({
 uId: {
  type: String
 },
 tipo: {
  type: Number
 },
 fotos: {
  type: Array
 },
 nombre: {
  type: String
 },
 categorias: {
  type: Array
 },
 descripcion: {
  type: String
 },
 cambio: {
  type: String
 }
}, { timestamps: true });

/**
 * This issue is probably coming from the fact that you are creating a mongoose model without specifying the name of the collection.
 * const Model = mongoose.model("Model", fileSchema, "NameOfCollection");
 */
const Barters = mongoose.model('Barters', BartersSchema, 'Barters');

module.exports = Barters;
