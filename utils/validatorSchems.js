const Joi = require("joi");
const { REGEXP } = require("../config/config");

const registerSchema = Joi.object({
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

const loginSchema = Joi.object({
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

const infoSchema = Joi.object({
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

const verifySchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
}).messages({
  "string.email":
    "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  favoriteSchema,
  registerSchema,
  loginSchema,
  verifySchema,
  infoSchema,
};
