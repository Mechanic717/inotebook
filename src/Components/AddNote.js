import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        // Reset the form after adding a note
        setNote({ title: "", description: "", tag: "default" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        rows="3"
                        minLength={5}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary my-2"
                    onClick={handleClick}
                    disabled={note.title.length < 5 || note.description.length < 5}
                >
                    Add Note
                </button>
            </form>
        </>
    );
}

export default AddNote;
