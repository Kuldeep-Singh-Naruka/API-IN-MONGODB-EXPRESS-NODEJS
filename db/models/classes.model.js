const mongoose = require('mongoose');

const ClassesSchema = new mongoose.Schema({
    classesName:{
        type:String,
        required: [true, "Please enter classes name"]
    },
});

Classes = mongoose.model('classes',ClassesSchema);
 module.exports = Classes;