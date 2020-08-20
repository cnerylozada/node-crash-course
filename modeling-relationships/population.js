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

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

const createAuthor = async (name, bio, website) => {
  const authorCreated = await new Author({ name, bio, website }).save();
  console.log(authorCreated);
};

const createCourse = async (name, authorId) => {
  const courseCreated = await new Course({ name, authorId }).save();
  console.log(courseCreated);
};

// createAuthor("Mosh", "My bio", "My Website");
createCourse("Node Course", "5f3e87e60f638805ad407b20");
