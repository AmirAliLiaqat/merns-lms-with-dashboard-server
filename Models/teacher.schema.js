const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Invalid phone number",
    ],
  },
  cnic: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    default: "teacher",
  },
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema , 'Teacher');

module.exports = TeacherModel;
