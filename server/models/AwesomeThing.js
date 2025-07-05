const mongoose = require('mongoose');

const AwesomeThingSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

module.exports = mongoose.model('AwesomeThing', AwesomeThingSchema);
