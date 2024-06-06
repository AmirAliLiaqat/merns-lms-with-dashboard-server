const express = require("express");
const router = express.Router();

router.post("/createTeacher", (req, res) => {
  res.send("Teacher created");
});
// router.get("/getTeacher", (req, res) => {
//   res.send("Teacher fetched");
// });

// router.get("/getTeachersByID/:id", (req, res) => {
//   res.send("Teacher fetched by ID");
// });

router.put("/updateTeacher", (req, res) => {
  res.send("Teacher updated");
});

// router.delete("/deleteTeacher", (req, res) => {
//   res.send("Teacher deleted");
// });

module.exports = router;
