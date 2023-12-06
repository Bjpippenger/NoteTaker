document.getElementById('save-note').addEventListener('click', function(event) {
    event.preventDefault();
  
    const newNote = {
      title: document.getElementById('note-title').value,
      text: document.getElementById('note-text').value
    };
  
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Note saved:', data);
        // Add code to update the UI or display a success message
      })
      .catch(error => {
        console.error('Error saving note:', error);
        // Add code to handle the error or display an error message
      });
  });