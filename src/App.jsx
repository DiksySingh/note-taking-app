import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleSaveNote = (note) => {
    if (editNote) {
      const updatedNotes = notes.map((n) =>
        n.id === editNote.id ? { ...n, ...note, timestamp: Date.now() } : n
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        ...note,
        timestamp: Date.now(),
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditNote(null);
  };

  return (
    <Container>
      <h1 className="my-4 col-6 offset-4">Simple Note Taking App</h1>
      <Button onClick={() => setShowForm(true)} className="mb-3">
        Add Note
      </Button>
      <NoteList
        notes={notes}
        handleEdit={handleEditNote}
        handleDelete={handleDeleteNote}
      />
      <NoteForm
        show={showForm}
        handleClose={handleCloseForm}
        handleSave={handleSaveNote}
        editNote={editNote}
      />
    </Container>
  );
};

export default App;
