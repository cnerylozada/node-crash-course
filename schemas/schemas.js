const yup = require("yup");
const Joi = require("@hapi/joi");

const courseSchema = yup.object().shape({
  name: yup.string().min(5).required(),
  age: yup.number().min(25).integer().required(),
});

const userSchema = Joi.object({
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = {
  courseSchema,
  userSchema,
};
