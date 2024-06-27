const { StudentModel } = require("../Models/student.schema");

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
    } = req.body;
  
    
    const profilePicture = req.file.path;

    
    const student = new StudentModel({
      age,
      firstName,
      email,
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

module.exports = {
  createStudent,
  getAllStudents,
};
