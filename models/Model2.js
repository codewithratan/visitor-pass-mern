// Model2.js example content
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model2Schema = new Schema({
  field2: { type: String, required: true },
});
module.exports = mongoose.model('Model2', Model2Schema);
