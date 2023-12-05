const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  // Generate a unique id for the new note
  newNote.id = Date.now();

  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes));

  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  // Find the note with the given id and remove it from the array
  const updatedNotes = notes.filter((note) => note.id !== noteId);

  fs.writeFileSync('db.json', JSON.stringify(updatedNotes));

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});