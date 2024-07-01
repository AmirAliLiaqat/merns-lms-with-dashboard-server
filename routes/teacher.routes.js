const express = require("express");
const {createTeacher, getAllTeachers, loginTeacher} = require("../handler/teacher.handler");
const { upload } = require("./admin.routes");

const teacherRouter = express.Router();

teacherRouter.get("/getAllTeachers", getAllTeachers);
teacherRouter.post("/loginTeacher", loginTeacher);
teacherRouter.post(
  "/createTeacher",
  upload.single("profilePicture"),
  createTeacher
);
teacherRouter.put("/updateTeacher/:teacherId");
teacherRouter.delete("/deleteTeacher/:teacherId");

module.exports = {
  teacherRouter,
};
