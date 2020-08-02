const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { Blog } = require("./models/blogs");
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

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../views/index.html"));
});

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  res.send(blog);
});

app.post("/api/blog", async (req, res) => {
  const blogAdded = await new Blog(req.body).save();
  res.send(blogAdded);
});

app.use((req, res) => {
  res.status(404).sendFile(path.resolve("../views/not-found.html"));
});
