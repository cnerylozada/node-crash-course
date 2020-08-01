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
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

app.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  res.send(blog);
});

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "my new blog2",
    snippet: "about more mongodb",
    body: "lorep ipsum...",
  });
  blog.save().then((_) => res.send(_));
});

app.use((req, res) => {
  res.status(404).sendFile("./views/not-found.html", { root: __dirname });
});
