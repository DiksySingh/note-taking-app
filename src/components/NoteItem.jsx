import React from 'react';
import { Card, Button } from 'react-bootstrap';

const NoteItem = ({ note, handleEdit, handleDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
        <Card.Text><small>{new Date(note.timestamp).toLocaleString()}</small></Card.Text>
        <Button variant="primary" onClick={() => handleEdit(note)}>Edit</Button> &nbsp;
        <Button variant="danger" onClick={() => handleDelete(note.id)} className="ml-2">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default NoteItem;
