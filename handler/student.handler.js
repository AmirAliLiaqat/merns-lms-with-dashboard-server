const { StudentModel } = require("../Models/student.schema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    const haspassword = await bcrypt.hash(password, salt);
    const profilePicture = req.file.path;

    const student = new StudentModel({
      age,
      firstName,
      email,
      password: haspassword,
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

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const loginStudent = async (req, res) => {
  try {
    const {email, password} = req.body; 
    const userData = await StudentModel.findOne({ email: email });
    console.log("userData", userData);
    if (userData == null) {
      res.status(404).json({ message: "Invalid Credentials" });
    } else {
      const isMatch = await bcrypt.compare(
        password,
        userData.password
      );
      if (isMatch) {
        res.status(200).json(userData);
      } else {
        res.status(404).json({ message: "Invalid password" });
      }
    }
  } catch (error) {}
};
module.exports = {
  createStudent,
  getAllStudents,
  loginStudent,
};
