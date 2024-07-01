const express = require("express");
const {
  createStudent,
  getAllStudents,
  loginStudent,
} = require("../handler/student.handler");
const { upload } = require("./admin.routes");

const studentRouter = express.Router();

studentRouter.get("/getAllStudents", getAllStudents);
studentRouter.post("/loginStudent", loginStudent);
studentRouter.post(
  "/createStudent",
  upload.single("profilePicture"),
  createStudent
);
studentRouter.put("/updateStudent/:studentId");
studentRouter.delete("/deleteStudent/:studentId");

module.exports = {
  studentRouter,
};
