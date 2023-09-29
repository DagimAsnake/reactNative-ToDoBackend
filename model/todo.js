const mongoose = require("mongoose");
const {Schema, model} = mongoose

const ToDoSchema = new Schema({
    title:{
        type:String, 
        required:true
    },
    description: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    }
})

const ToDo = model("ToDo", ToDoSchema);
module.exports = ToDo