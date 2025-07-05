const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

const defaultTodos = [
  
  { text: "Painting 🎨", done: true, listName: "varsha" },
  { text: "Dancing 💃", done: true, listName: "varsha" },
  { text: "Singing 🎤", done: true, listName: "varsha" },
  { text: "Content Creation 🎬", done: true, listName: "varsha" },
  { text: "Video Editing 🎞️", done: true, listName: "varsha" },
  { text: "Making Coffee ☕", done: true, listName: "varsha" },
  { text: "Making Light Food 🍳", done: true, listName: "varsha" },
  { text: "Paying Bills 💵", done: true, listName: "varsha" },
  { text: "Gifting Me Things 🎁", done: true, listName: "varsha" },
  { text: "Gifting Papa Mumma Things 🎁", done: true, listName: "varsha" },
  { text: "Planning Friends Trips ✈️", done: true, listName: "varsha" },
  { text: "Being Star of the Night 🌟", done: true, listName: "varsha" },
  { text: "Just Being Alive & Sexy 😘", done: true, listName: "varsha" },
  { text: "Reading Books 📚", done: true, listName: "varsha" },
  { text: "Reading Psychology 🧠", done: true, listName: "varsha" },

  
  { text: "Archery 🏹", done: false, listName: "yashi" },
  { text: "Fencing 🤺", done: false, listName: "yashi" },
  { text: "Sky Diving 🪂", done: false, listName: "yashi" },
  { text: "Deep Scuba 🤿", done: false, listName: "yashi" },
  { text: "Trekking ⛰️", done: false, listName: "yashi" },
  { text: "Camping 🏕️", done: false, listName: "yashi" },
  { text: "Buying a House 🏠", done: false, listName: "yashi" },
  { text: "Buying a Bike 🏍️", done: false, listName: "yashi" },
  { text: "BTS Concert 🎤", done: false, listName: "yashi" },
  { text: "World Tour 🌏", done: false, listName: "yashi" },
  { text: "Martial Arts 🥋", done: false, listName: "yashi" },
  { text: "Late Night Drives 🚗", done: false, listName: "yashi" },
  { text: "Shooting Practice 🔫", done: false, listName: "yashi" }
];

const populateDefaults = async () => {
  const count = await Todo.countDocuments();
  if (count === 0) {
    await Todo.insertMany(defaultTodos);
    console.log("✅ Default todos added");
  }
};
populateDefaults();

router.get('/:listName', async (req, res) => {
  const todos = await Todo.find({ listName: req.params.listName });
  res.json(todos);
});

router.post('/:listName', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    done: req.body.done || false,
    listName: req.params.listName
  });
  await newTodo.save();
  res.json(newTodo);
});

router.patch('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, { done: req.body.done }, { new: true });
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
