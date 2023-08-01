const Joi = require("joi");
const { REGEXP, CATEGORY, SEX } = require("../config");

class NoticeValidationSchema {
  add = Joi.object({
    title: Joi.string().pattern(REGEXP.title.reg).required().messages({
      "string.pattern.base": REGEXP.title.mes,
    }),
    category: Joi.string()
      .valid(...CATEGORY)
      .required()
      .messages({
        "any.only": `Field 'category' must be on of the [ ${CATEGORY} ]`,
      }),
    name: Joi.string().pattern(REGEXP.name.reg).required().messages({
      "string.pattern.base": REGEXP.name.mes,
    }),
    birthday: Joi.string().pattern(REGEXP.birthday.reg).required().messages({
      "string.pattern.base": REGEXP.birthday.mes,
    }),
    type: Joi.string().pattern(REGEXP.type.reg).required().messages({
      "string.pattern.base": REGEXP.type.mes,
    }),
    sex: Joi.string()
      .valid(...SEX)
      .required()
      .messages({
        "any.only": `Field 'sex' must be on of the [ ${SEX} ]`,
      }),
    location: Joi.string().pattern(REGEXP.location.reg).required().messages({
      "string.pattern.base": REGEXP.location.mes,
    }),
    price: Joi.number()
      .min(1)
      .when("category", {
        is: Joi.string().valid(CATEGORY[0]),
        then: Joi.required(),
      }),
    comments: Joi.string().allow(null, "").min(1).max(120),
  });

  login = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email":
          "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
      }),
    password: Joi.string().pattern(REGEXP.password.reg).messages({
      "string.pattern.base": REGEXP.password.mes,
    }),
    birthday: Joi.string().pattern(REGEXP.birthday.reg).required().messages({
      "string.pattern.base": REGEXP.birthday.mes,
    }),
  });

  info = Joi.object({
    name: Joi.string().pattern(REGEXP.name.reg).required().messages({
      "string.pattern.base": REGEXP.name.mes,
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email":
          "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
      }),
    birthday: Joi.string().pattern(REGEXP.birthday.reg).required().messages({
      "string.pattern.base": REGEXP.birthday.mes,
    }),
    phone: Joi.string().pattern(REGEXP.phone.reg).messages({
      "string.pattern.base": REGEXP.phone.mes,
    }),
    city: Joi.string().pattern(REGEXP.city.reg).required().messages({
      "string.pattern.base": REGEXP.city.mes,
    }),
  });

  verify = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }).messages({
    "string.email":
      "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
  });

  favorite = Joi.object({
    favorite: Joi.boolean().required(),
  });
}
const noticeValidationSchema = new NoticeValidationSchema();
module.exports = noticeValidationSchema;
