const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();

  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  notes.push(newNote);

  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

  res.json(newNote);
});

module.exports = router;