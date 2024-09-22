import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  // State to hold the current note being edited
  const [currentNote, setCurrentNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  // References for modal triggers
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  // Function to open the modal and populate it with the selected note's data
  const updateNote = (note) => {
    ref.current.click(); // Programmatically click the hidden button to open the modal
    setCurrentNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  // Handle input changes in the modal form
  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the note
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag);
    refClose.current.click(); // Close the modal after saving
  };

  return (
    <>
      <AddNote />

      {/* Hidden button to trigger the modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Launch edit modal
      </button>

      {/* Edit Note Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Title Input */}
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={currentNote.etitle}
                    onChange={handleChange}
                    minLength={5}
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={currentNote.edescription}
                    onChange={handleChange}
                    rows="3"
                    minLength={5}
                    required
                  ></textarea>
                </div>

                {/* Tag Input */}
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={currentNote.etag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={currentNote.etitle.length < 5 || currentNote.edescription.length < 5}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
