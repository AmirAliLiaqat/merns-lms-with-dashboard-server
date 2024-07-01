const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("./config/connection.js");
const { adminRouter } = require("./routes/admin.routes.js");
const { studentRouter } = require("./routes/student.routes.js");
const { teacherRouter } = require("./routes/teacher.routes.js");

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

app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(PORT, () => {
  console.log(`Server in running on port ${PORT}`);
});
