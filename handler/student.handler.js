const StudentModel = require("../models/student.schema.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// create student
const createStudent = async (req, res) => {
  try {
    const {
      age,
      firstName,
      email,
      cnic,
      department,
      lastName,
      phoneNumber,
      section,
      password,
    } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    const profilePicture = req.file.path;

    const student = new StudentModel({
      age,
      firstName,
      email,
      password: hashPassword,
      cnic,
      department,
      lastName,
      phoneNumber,
      section,
      profilePicture,
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// login student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await StudentModel.findOne({ email });

    if (!userData) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (isMatch) {
      res.status(200).json(userData);
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  loginStudent,
};
