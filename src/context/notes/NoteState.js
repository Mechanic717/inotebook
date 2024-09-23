import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);

    // Function to fetch all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch notes: ${response.statusText}`);
            }

            const json = await response.json();
            console.log("Fetched notes:", json);
            setnotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // Function to add a new note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error(`Failed to add note: ${response.statusText}`);
            }

            const json = await response.json();
            console.log("Added a new note:", json);
            setnotes(notes.concat(json));
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Function to delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete note: ${response.statusText}`);
            }

            const json = await response.json();
            console.log("Delete note response:", json);

            const newNotes = notes.filter((note) => note._id !== id);
            setnotes(newNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Function to edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error(`Failed to edit note: ${response.statusText}`);
            }

            const json = await response.json();
            console.log("Edit note response:", json);

            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if (element._id === id) {
                    element.title = title;
                    element.description = description;
                    element.tag = tag;
                    break;
                }
            }

            setnotes([...notes]);
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    // Fetch all notes when the component mounts
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
