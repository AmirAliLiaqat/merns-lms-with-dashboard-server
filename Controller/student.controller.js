const studentModel = require("../Models/student.schema");

const createStudent = async (req, res) => {
  try {
    const studentData = await studentModel.create(req.body);
    res.status(200).json(studentData);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createStudent,
};
