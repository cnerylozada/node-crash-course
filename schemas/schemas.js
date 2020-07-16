const yup = require("yup");

const courseSchema = yup.object().shape({
  name: yup.string().min(5).required(),
  age: yup.number().min(25).integer().required(),
});

module.exports = courseSchema;
