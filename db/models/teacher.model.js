const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter name"]
    },
    subject:{
        type:String,
        required: [true, "Please enter subject name"]
    },
    classes:{
        type:Array
    }
});

Teacher = mongoose.model('teacher',TeacherSchema);
module.exports = Teacher;