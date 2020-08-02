const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { Course } = require("../models/courses");
const { mongoDBURI } = require("../models/connection");

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
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../views/index.html"));
});

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

app.get("/api/all-courses", (req, res) => {
  res.redirect("/api/courses");
});

app.get("/api/courses/query", (req, res) => {
  Course.find({ author: "Cesar", isPublished: false })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
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

app.post("/api/courses", async (req, res) => {
  const courseAdded = await new Course(req.body).save();
  res.send(courseAdded);
});

app.use((req, res) => {
  res.status(404).sendFile(path.resolve("../views/not-found.html"));
});
