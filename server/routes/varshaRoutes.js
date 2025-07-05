const express = require('express');
const router = express.Router();
const WithVarsha = require('../models/WithVarsha');
const Person = require('../models/Person');

router.get('/', async (req, res) => {
  try {
    const people = await Person.find().select('name -_id');
    const tasks = await WithVarsha.find();
    res.json({
      people: people.map(p => p.name),
      tasks
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch WithVarsha list." });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = new WithVarsha({
      text: req.body.text,
      person: req.body.person
    });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    res.status(400).json({ error: "Failed to add item." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await WithVarsha.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete item." });
  }
});
router.post('/person', async (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const existing = await Person.findOne({ name });
  if (existing) return res.status(400).json({ error: "Person already exists" });

  const newPerson = new Person({ name });
  await newPerson.save();

  res.json({ message: "Person added", person: name });
});

module.exports = router;
