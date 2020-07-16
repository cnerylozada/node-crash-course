const userSchema = require("../schemas/schemas");

module.exports = {
  addCourseValidation: (req, res, next) => {
    userSchema.validate(req.body, { abortEarly: false }).then(
      (_) => {
        next();
      },
      (err) => {
        res.status(404).send(err.errors);
      }
    );
  },
};
