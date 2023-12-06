document.getElementById('note-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const noteTitle = document.getElementById('note-title').value;
    const noteText = document.getElementById('note-text').value;
    if (noteTitle && noteText) {
      saveNote({
        title: noteTitle,
        text: noteText
      });
    }
  });
  
  function saveNote(note) {
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response and update the UI
      console.log('Note saved:', data);
    })
    .catch(error => {
      console.error('Error saving note:', error);
    });
  }
  