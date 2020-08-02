const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { mongoDBURI } = require("../models/connection");
const morgan = require("morgan");
const blogRoutes = require("../routes/netninja-routes");

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
  res.sendFile(path.resolve("views/index.html"));
});

app.use("/api", blogRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.resolve("views/not-found.html"));
});
