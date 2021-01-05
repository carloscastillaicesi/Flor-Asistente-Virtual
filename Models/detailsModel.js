const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
 _id: {
  type: String,
  required: true,
 }, ubicacionHuerta: {
  type: String
 },
 gallery: {
  type: Array
 },
 beneficiosSalud: {
  type: String
 },
 expectativaHuerta: {
  type: String
 },
 encargadosHuerta: {
  type: String
 },
 tiempoDedicadoHuerta: {
  type: String
 },
 tiempoExperiencia: {
  type: String
 },
 conocimiento: {
  type: String
 }
}, { timestamps: true });

/**
 * This issue is probably coming from the fact that you are creating a mongoose model without specifying the name of the collection.
 * const Model = mongoose.model("Model", fileSchema, "NameOfCollection");
 */
const Details = mongoose.model('Details', detailsSchema, 'Details');

module.exports = Details;
