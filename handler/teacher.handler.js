const TeacherModel = require("../Models/teacher.schema");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// create Teacher
const createTeacher = async (req, res) => {
  try {
    const {
      firstName,
      email,
      cnic,
      lastName,
      phoneNumber,
      qualification,
      password,
    } = req.body;


    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    const profilePicture = req.file.path;

    const Teacher = new TeacherModel({
      firstName,
      email,
      password: hashPassword,
      cnic,
      lastName,
      qualification,
      phoneNumber,
      profilePicture,
    });

    await Teacher.save();
    return res.status(201).json(Teacher);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get all Teachers
const getAllTeachers = async (req, res) => {
  try {
    const Teachers = await TeacherModel.find();
    res.status(200).json(Teachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// login Teacher
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await TeacherModel.findOne({ email });

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
  createTeacher,
  getAllTeachers,
  loginTeacher,
};
