const Joi = require("joi");
const { REGEXP, SEX } = require("../config");

class PetValidationSchema {
  add = Joi.object({
    name: Joi.string().pattern(REGEXP.name.reg).required().messages({
      "string.pattern.base": REGEXP.name.mes,
    }),
    birthday: Joi.string().pattern(REGEXP.birthday.reg).required().messages({
      "string.pattern.base": REGEXP.birthday.mes,
    }),
    type: Joi.string().pattern(REGEXP.type.reg).required().messages({
      "string.pattern.base": REGEXP.type.mes,
    }),
    // sex: Joi.string()
    //   .valid(...SEX)
    //   .required()
    //   .messages({
    //     "any.only": `Field 'sex' must be on of the [ ${SEX} ]`,
    //   }),
    // location: Joi.string().pattern(REGEXP.location.reg).required().messages({
    //   "string.pattern.base": REGEXP.location.mes,
    // }),
    comments: Joi.string().min(1).max(120),
  });
}
const petValidationSchema = new PetValidationSchema();
module.exports = petValidationSchema;
