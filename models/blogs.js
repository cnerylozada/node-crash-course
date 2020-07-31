const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDBURI =
  "mongodb+srv://cnerylozada:19467381Abc@nodeninja.pwwtx.mongodb.net/nodeninja?retryWrites=true&w=majority";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = { mongoDBURI, Blog };
