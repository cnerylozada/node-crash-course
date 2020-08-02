const express = require("express");
const { Blog } = require("../models/blogs");

const router = express.Router();

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  res.send(blog);
});

router.post("/blog", async (req, res) => {
  const blogAdded = await new Blog(req.body).save();
  res.send(blogAdded);
});

module.exports = router;
