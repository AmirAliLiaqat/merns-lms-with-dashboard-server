const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/react-admin-dashboard");
    console.log("Mongodb connected successfully...");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

module.exports = {
  databaseConnection,
};
