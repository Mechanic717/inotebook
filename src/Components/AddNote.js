import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [loading, setLoading] = useState(false); // Define loading state

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addNote(note.title, note.description, note.tag);
            props.showAlert("Added Successfully", "success"); // Match format
        } catch (error) {
            props.showAlert("Failed to add note", "danger");
        } finally {
            setLoading(false);
            setNote({ title: "", description: "", tag: "" });
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h2>Add a Note</h2>
            <form onSubmit={handleClick}>
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
                    disabled={loading || note.title.length < 5 || note.description.length < 5} // Disable button while loading
                >
                    {loading ? "Adding..." : "Add Note"}
                </button>
            </form>
        </>
    );
};

export default AddNote;
