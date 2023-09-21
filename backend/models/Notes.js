const mongoose = require("mongoose")
const { Schema } = mongoose;
const {body,validationResult}= require("express-validator")


const NotesSchema = new Schema({
    user :{
        //works as foreign key
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type:String,
        required : true
    },
    description :{
        type:String,
        required : true,
    },
    tag : {
        type: String,
        default:"General"
    },
    date : {
        type: Date,
        default : Date.now
    },
});




module.exports = mongoose.model('notes',NotesSchema) ;