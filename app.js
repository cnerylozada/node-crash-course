const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port);

const courses = [
  { id: 1, name: "Mongo DB" },
  { id: 2, name: "Amazon web services" },
  { id: 3, name: "React native" },
  { id: 4, name: "Node js" },
  { id: 5, name: "Angular" },
  { id: 6, name: "SCSS" },
];

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find((_) => _.id == courseId);
  !!course ? res.send(course) : res.status(404).send("NOT FOUND");
});

app.post("/api/courses", (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.send(newCourse);
});
