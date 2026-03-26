// Model1.js example content
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model1Schema = new Schema({
  field1: { type: String, required: true },
});
module.exports = mongoose.model('Model1', Model1Schema);
