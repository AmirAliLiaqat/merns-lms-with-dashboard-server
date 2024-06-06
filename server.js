const express = require("express");
const app = express();
app.use(express.json());
require("./Config/db.connection");
const userRoutes = require("./Routes/student.routes");
const adminRoutes = require("./Routes/admin.routes");
const teacherRoutes = require("./Routes/teacher.routes");
const lessonRoutes = require("./Routes/lesson.routes");

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/lesson", lessonRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
