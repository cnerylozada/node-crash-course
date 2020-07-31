const express = require("express");
const mongoose = require("mongoose");
const { mongoDBURI, Blog } = require("./models/blogs");

const app = express();

mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("Connected to db");
    const port = process.env.PORT || 3000;
    app.listen(port);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/blogs", (req, res) => {
  Blog.find().then((_) => {
    res.send(_);
  });
});

app.get("/blogs/:id", (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId).then((_) => res.send(_));
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
