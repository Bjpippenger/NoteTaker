const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const dbPath = path.join(__dirname, "db/db.json");

app.get("/api/notes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read from database" });
    }
    let notes;
    try {
      notes = JSON.parse(data);
      if (!Array.isArray(notes)) {
        throw new Error("Invalid data in database");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Invalid data in database" });
    }
    res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read from database" });
    }
    let notes;
    try {
      notes = JSON.parse(data);
      if (!Array.isArray(notes)) {
        throw new Error("Invalid data in database");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Invalid data in database" });
    }
    const newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write to database" });
      }
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read from database" });
    }
    let notes;
    try {
      notes = JSON.parse(data);
      if (!Array.isArray(notes)) {
        throw new Error("Invalid data in database");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Invalid data in database" });
    }
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(dbPath, JSON.stringify(updatedNotes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write to database" });
      }
      res.json({ success: true });
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});