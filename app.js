const express = require("express");
const morgan = require("morgan");
const {
  addCourseValidation,
  addUserValidation,
} = require("./middlewares/inputValidation");
const mongoose = require("mongoose");
const { Course } = require("./models/courses");
const { mongoDBURI } = require("./models/connection");

const app = express();
mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    const port = process.env.PORT || 3000;
    app.listen(port);
  });

app.use(express.json());

const courses = [
  { id: 1, name: "Mongo DB" },
  { id: 2, name: "Amazon web services" },
  { id: 3, name: "React native" },
  { id: 4, name: "Node js" },
  { id: 5, name: "Angular" },
  { id: 6, name: "SCSS" },
];

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

app.get("/api/all-courses", (req, res) => {
  res.redirect("/api/courses");
});

app.get("/api/query", (req, res) => {
  Course.find({ author: "Cesar", isPublished: false })
    .sort({ name: 1 })
    .then((_) => res.send(_));
});

app.get("/api/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    res.send(course);
  } catch (err) {
    res.status(404).send("Custom Message: NOT FOUND !");
  }
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
  res.status(404).sendFile("./views/not-found.html", { root: __dirname });
});
