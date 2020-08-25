const express = require("express");
const mongoose = require("mongoose");
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

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    author: authors,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "Cristh Nery",
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.author = [...course.author, author];
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  course.author = [...course.author].filter((_) => _._id + "" !== authorId);
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Mosh", bio: "My bio", website: "My website" }),
//   new Author({ name: "Crish", bio: "Second life", website: "imdb" }),
// ]);
removeAuthor("5f4441597fa54b56029c1dfb", "5f4441597fa54b56029c1dfa");
