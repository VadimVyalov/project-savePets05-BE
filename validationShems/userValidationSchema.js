const Joi = require("joi");
const { REGEXP } = require("../config");

class UserValidationSchema {
  register = Joi.object({
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
    name: Joi.string().pattern(REGEXP.name.reg).required().messages({
      "string.pattern.base": REGEXP.name.mes,
    }),
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
  });

  info = Joi.object({
    name: Joi.string().pattern(REGEXP.name.reg).messages({
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
    phone: Joi.string().pattern(REGEXP.phone.reg).allow(null, "").messages({
      "string.pattern.base": REGEXP.phone.mes,
    }),
    city: Joi.string().pattern(REGEXP.city.reg).allow(null, "").messages({
      "string.pattern.base": REGEXP.city.mes,
    }),
    avatarURL: Joi.string().allow(null, ""),
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
const userValidationSchema = new UserValidationSchema();
module.exports = userValidationSchema;
