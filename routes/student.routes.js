const express = require("express");
const { createStudent, getAllStudents,loginStudent } = require("../handler/student.handler");
const { upload } = require("../routes/user.route");
const router = express.Router();

router.get("/getAllStudents", getAllStudents);
router.post("/loginStudent", loginStudent);
router.post("/createStudent", upload.single("profilePicture"),createStudent);
router.put("/updateStudent/:studentId");
router.delete("/deletStudent/:studentId");

module.exports = router;
