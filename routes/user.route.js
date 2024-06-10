const express = require("express");
const multer = require("multer");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/svg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"), false);
    }
  },
});

userRouter.post("/", upload.single("profilePicture"), createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.get("/loginWithEmail/:email", getUserByEmail);
userRouter.put("/:id", upload.single("profilePicture"), updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = {
  userRouter,
};
