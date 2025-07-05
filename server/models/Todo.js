const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  listName: { type: String, required: true }
});

module.exports = mongoose.model('Todo', TodoSchema);
