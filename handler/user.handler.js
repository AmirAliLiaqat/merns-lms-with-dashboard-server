const fs = require("fs");
const User = require("../models/user.schema");

// create user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, age } = req.body;
    const profilePicture = req.file.path;

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      profilePicture,
    });

    await newUser.save();
    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user by id", error: error.message });
  }
};

// get user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user by email", error: error.message });
  }
};

// update user by id
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, phoneNumber, age } = req.body;
  const profilePicture = req.file.path;
  const updatedUser = {
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    profilePicture,
    accessLevel: "Admin",
  };

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete the profile picture file
    if (user.profilePicture) {
      fs.unlinkSync(user.profilePicture);
    }
    // Update the user in the database
    await User.findByIdAndUpdate(userId, updatedUser, { new: true });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the profile picture file
    if (user.profilePicture) {
      fs.unlinkSync(user.profilePicture);
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
