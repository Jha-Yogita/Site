const mongoose = require('mongoose');

const WithVarshaSchema = new mongoose.Schema({
  text: { type: String, required: true },
  person: { type: String, required: true }
});

module.exports = mongoose.model('WithVarsha', WithVarshaSchema);
