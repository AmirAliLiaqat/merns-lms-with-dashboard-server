const express = require("express");
const multer = require("multer");
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  getAdminByEmail,
  updateAdminById,
  deleteAdminById,
} = require("../handler/admin.handler");

const adminRouter = express.Router();

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

adminRouter.post("/", upload.single("profilePicture"), createAdmin);
adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminById);
adminRouter.get("/loginWithEmail/:email", getAdminByEmail);
adminRouter.put("/:id", upload.single("profilePicture"), updateAdminById);
adminRouter.delete("/:id", deleteAdminById);

module.exports = {
  upload,
  adminRouter,
};
