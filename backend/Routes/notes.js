const express = require("express");
const router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
const Notes = require("../models/Notes");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { body, validationResult } = require("express-validator");

//Route 1:Get all the notes using GET"/api/notes/fetchallnotes".Login  required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes); // Now you can access the globally scoped obj
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//Route 2:Add a new note using POST"api/notes/addnote.Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are error ,return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Return validation errors with status 400
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote); // Now you can access the globally scoped obj
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3:Updating an existing note using PUT "/api/notes/updatenote".Login Required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it

    let note = await Notes.findById(req.params.id);

    //If note is not found
    if (!note) {
      res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//Route 4:Deleting an existing note using DELETE "/api/notes/deletenote".Login Required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //Find the note to be Deleted and Delete it

    let note = await Notes.findById(req.params.id);

    //If note is not found
    if (!note) {
      res.status(404).send("Not found");
    }
    //Allow deleteion only if user owns this note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

module.exports = router;
