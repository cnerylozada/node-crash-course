const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { Course, validateCourse } = require("../models/courses");
const { mongoDBURI } = require("../models/connection");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    const port = process.env.PORT || 8000;
    app.listen(port);
  });

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("views/index.html"));
});

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find().select("-__v");
  res.status(200).send(courses);
});

app.get("/api/all-courses", (req, res) => {
  res.redirect("/api/courses");
});

app.get("/api/courses/querying-documents", (req, res) => {
  Course.find({ author: "Cesar", isPublished: false })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .then((_) => res.send(_));
});

app.get("/api/courses/logical-query-operators", (req, res) => {
  Course.find()
    .or([{ name: /^Mosh$/ }, { isPublished: true }])
    .then((_) => res.send(_));
});

app.get("/api/courses/pagination", (req, res) => {
  const pageNumber = 2;
  const pageSize = 4;
  Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((_) => res.send(_));
});

app.get("/api/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    res.status(302).send(course);
  } catch (err) {
    res.status(404).send("Custom Message: NOT FOUND !");
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    await validateCourse(req.body);
    const courseAdded = await new Course(req.body).save();
    res.status(201).send(courseAdded);
  } catch (err) {
    res.status(404).send(err.errors);
  }
});

app.put("/api/courses/:id", async (req, res) => {
  const courseUpdated = await Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(302).send(courseUpdated);
});

app.delete("/api/courses/:id", async (req, res) => {
  await Course.deleteOne({ _id: req.params.id });
  res.status(204).send("Document was deleted successfully");
});

app.use((req, res) => {
  res.status(404).sendFile(path.resolve("views/not-found.html"));
});
