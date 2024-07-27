import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';
import { Pagination, Form } from 'react-bootstrap';

const NoteList = ({ notes, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const notesPerPage = 10;

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredNotes.length / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search notes"
        className="mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {currentNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default NoteList;
