const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
})

const studentModel = mongoose.model('student',studentSchema,'student');

module.exports = studentModel;