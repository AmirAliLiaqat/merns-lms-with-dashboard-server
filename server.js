const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("./database/connection.js");
const { userRouter } = require("./routes/user.route.js");

const app = express();
const PORT = 5000;

// MongoDB connection
databaseConnection();

// Allow only a specific origin
const allowedOrigin = "http://localhost:3000";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server in running on port ${PORT}`);
});
