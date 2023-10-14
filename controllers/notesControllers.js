const { Note } = require("../models/Note");

const getNotes = async (req, res) => {
    try {
        const id = req.userID
        const notes = await Note.find({userId:id}).sort({ _id: -1 });
        res.status(200).send({ message: "Notes found", notes });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

const getSingleNotes = async (req, res) => {
    try {
        const id = req.params.id; 
        const singleNotes = await Note.findOne({_id: id});
        res.status(200).send({ message: "Note found", singleNotes });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

const createNote = async (req, res) => {
    try {
        const { title, description } = req.body; 
        const newNote = new Note({
            userId:req.userID,
            title,
            description
        });
        await newNote.save();
        res.status(200).send({ message: "Note created", newNote });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

const updateNote = async (req, res) => {
    try {
        const id = req.params.id; 
        const { title, description } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
        res.status(200).send({ message: "Note updated", updatedNote });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id; 
    try {
        const deletedNote = await Note.findByIdAndDelete(id); 
        res.status(200).send({ message: "Note deleted successfully", deletedNote });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

module.exports = {getNotes, createNote, updateNote, deleteNote, getSingleNotes}