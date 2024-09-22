import React, { useContext } from "react";
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
  const { note, updateNote } = props; // Consistent naming
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>

            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
              style={{ cursor: "pointer" }}
              title="Delete Note"
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note); // Correct function call
              }}
              style={{ cursor: "pointer" }}
              title="Edit Note"
            ></i>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
