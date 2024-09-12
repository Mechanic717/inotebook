const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    title:{
        name:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        default:"General"
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

  });
  module.exports=mongoose.model('Notes',NotesSchema)