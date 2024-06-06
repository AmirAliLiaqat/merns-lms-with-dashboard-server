const express = require("express");
const router = express.Router();

router.post("/createLesson", (req, res) => {
  res.send("Lesson created");
});
router.get("/getLesson", (req, res) => {
  res.send("Lesson fetched");
});

router.get("/getLessonsByID/:id", (req, res) => {
  res.send("Lesson fetched by ID");
});

router.put("/updateLesson", (req, res) => {
  res.send("Lesson updated");
});

router.delete("/deleteLesson", (req, res) => {
  res.send("Lesson deleted");
});

module.exports = router;