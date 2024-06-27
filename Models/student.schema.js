const mongoose = require('mongoose');


const StudentSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    cnic:{
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    accessLevel: {
        type: String,
        default: "Student"
    }
});


const StudentModel  = mongoose.model('student', StudentSchema,'student');

module.exports = {
    StudentModel
}