const express = require("express");
const { createStudent, getAllStudents } = require("../handler/student.handler");
const { upload } = require("../routes/user.route");
const router = express.Router();

router.get("/getAllStudents");
router.get("/getStudentById/:studentId");
router.post("/createStudent", upload.single("profilePicture"),createStudent);
router.put("/updateStudent/:studentId");
router.delete("/deletStudent/:studentId");

module.exports = router;
