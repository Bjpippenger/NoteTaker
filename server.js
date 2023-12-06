const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const html_routes = require('./routes/html-routes');
const api_routes = require('./routes/api-routes');

const PORT = process.env.PORT || 3000; // dynamically set the port
const app = express();

// Function to read notes from the db.json file
function readNotesFromFile() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data);
}

// Function to write notes to the db.json file
function writeNotesToFile(notes) {
  fs.writeFileSync('db.json', JSON.stringify(notes), 'utf8');
}

// Function to generate a unique ID for each new note
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Express middleware will always run the operation in the order from top to bottom "order matters"
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(html_routes);
app.use(api_routes);

// POST /api/notes route
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = readNotesFromFile();

  // Generate a unique ID for the new note
  newNote.id = generateUniqueId();

  // Add the new note to the notes array
  notes.push(newNote);

  // Write the updated notes array to the file
  writeNotesToFile(notes);

  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});