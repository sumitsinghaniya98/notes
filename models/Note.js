const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:{type:String, required:true, unique:true},
    description:{type:String, require:true}
})

const Note = mongoose.model("Note", notesSchema);

module.exports = {Note}