const express = require('express');
const router = express.Router();
const AwesomeThing = require('../models/AwesomeThing');

const defaultThings = [
  { text: "High IQ & EQ 💡" },
  { text: "Amazing Singer 🎤" },
  { text: "Fantastic Dancer 💃" },
  { text: "Beautiful Sketch Artist ✏️" },
  { text: "Queen of Relationships 👑" },
  { text: "Kind & Caring 🌸" },
  { text: "Funny & Cute 🥰" },
  { text: "Star of the Night 🌟" },
  { text: "Content Creation 🎬" },
  { text: "Video Editing 🎞️" },
  { text: "Making Coffee ☕" },
  { text: "Making Light Food 🍳" },
  { text: "Paying Bills 💵" },
  { text: "Gifting Me Things 🎁" },
  { text: "Gifting Papa Mumma Things 🎁" },
  { text: "Planning Friends Trips ✈️" },
  { text: "Just Being Alive & Sexy 😘" },
  { text: "Reading Books 📚" },
  { text: "Reading Psychology Stuff 🧠" }
];

router.get('/', async (req, res) => {
  try {
    let things = await AwesomeThing.find();

    
    if (things.length === 0) {
      await AwesomeThing.insertMany(defaultThings);
      things = await AwesomeThing.find();
    }

    res.json(things);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch awesome things." });
  }
});

router.post('/', async (req, res) => {
  try {
    const newThing = new AwesomeThing({ text: req.body.text });
    await newThing.save();
    res.json(newThing);
  } catch (err) {
    res.status(400).json({ error: "Failed to add awesome thing." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await AwesomeThing.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete awesome thing." });
  }
});

module.exports = router;
