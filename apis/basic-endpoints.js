const express = require("express");
const morgan = require("morgan");
const {
  addCourseValidation,
  addUserValidation,
} = require("../schema-validators/inputValidation");

const courses = [
  { id: 1, name: "Mongo DB" },
  { id: 2, name: "Amazon web services" },
  { id: 3, name: "React native" },
  { id: 4, name: "Node js" },
  { id: 5, name: "Angular" },
  { id: 6, name: "SCSS" },
];

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  // res.sendFile("../views/index.html", { root: __dirname });
  res.sendFile(path.resolve("../views/index.html"));
});

app.post("/api/courses", addCourseValidation, (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.send(_);
});

app.post("/api/users", addUserValidation, (req, res) => {
  const newUser = {
    username: req.body.name,
    password: req.body.password,
  };
  res.send(newUser);
});

app.use((req, res) => {
  // res.status(404).sendFile("../views/not-found.html", { root: __dirname });
  res.status(404).sendFile(path.resolve("../views/not-found.html"));
});
