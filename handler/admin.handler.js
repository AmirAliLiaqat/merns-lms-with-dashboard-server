const AdminModel = require("../models/admin.schema.js");
const fs = require("fs");

// create admin
const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, age } = req.body;
    const profilePicture = req.file.path;

    const newAdmin = new AdminModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      profilePicture,
    });

    await newAdmin.save();
    res
      .status(200)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: error.message });
  }
};

// get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admins", error: error.message });
  }
};

// get admin by id
const getAdminById = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await AdminModel.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    res.json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admin by id", error: error.message });
  }
};

// get admin by email
const getAdminByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }

    res.json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admin by email", error: error.message });
  }
};

// update admin by id
const updateAdminById = async (req, res) => {
  const adminId = req.params.id;

  const { firstName, lastName, email, phoneNumber, age } = req.body;
  const profilePicture = req.file.path;

  const updatedAdmin = {
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    profilePicture,
    accessLevel: "Admin",
  };

  try {
    // Find the admin by ID
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Delete the profile picture file
    if (admin.profilePicture) {
      fs.unlinkSync(admin.profilePicture);
    }
    // Update the admin in the database
    await AdminModel.findByIdAndUpdate(adminId, updatedAdmin, { new: true });

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating admin", error: error.message });
  }
};

// delete admin by id
const deleteAdminById = async (req, res) => {
  const adminId = req.params.id;

  try {
    // Find the admin by ID
    const admin = await AdminModel.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete the profile picture file
    if (admin.profilePicture) {
      fs.unlinkSync(admin.profilePicture);
    }

    // Delete the admin from the database
    await AdminModel.findByIdAndDelete(adminId);

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: error.message });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  getAdminByEmail,
  updateAdminById,
  deleteAdminById,
};
