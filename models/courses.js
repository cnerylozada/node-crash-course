const mongoose = require("mongoose");
const yup = require("yup");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: (v) => {
        return new Promise((res) => setTimeout(res, 3000, !!v && !!v.length));
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const validateCourse = (course) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    author: yup.string().required(),
    tags: yup.array().of(yup.string()).required(),
    date: yup.date(),
    isPublished: yup.boolean().required(),
  });
  return schema.validate(course, { abortEarly: false });
};

module.exports = { Course, validateCourse };
