const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  cnic: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    default: "Student",
  },
});

const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;
