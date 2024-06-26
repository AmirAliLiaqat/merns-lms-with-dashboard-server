const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
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
  profilePicture: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    default: "Admin",
  },
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = AdminModel;
