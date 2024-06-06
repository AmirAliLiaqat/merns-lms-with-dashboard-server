const express = require("express");
const router = express.Router();
const {createStudent} = require("../Controller/student.controller");
router.post("/createUser", createStudent);

router.get("/getUser", (req, res) => {
  res.send("User fetched");
});

router.get("/getUsersByID/:id", (req, res) => {
  res.send("User fetched by ID");
});

router.put("/updateUser", (req, res) => {
  res.send("User updated");
});

router.delete("/deleteUser", (req, res) => {
  res.send("User deleted");
});

module.exports = router;
