const { courseSchema, userSchema } = require("../schemas/schemas");

module.exports = {
  addCourseValidation: (req, res, next) => {
    courseSchema.validate(req.body, { abortEarly: false }).then(
      (_) => {
        next();
      },
      (err) => {
        res.status(404).send(err.errors);
      }
    );
  },

  addUserValidation: async (req, res, next) => {
    const validationResult = await userSchema.validate(req.body, {
      abortEarly: false,
    });
    !!validationResult.error
      ? res
          .status(404)
          .send(validationResult.error.details.map((_) => _.message))
      : next();
  },
};
