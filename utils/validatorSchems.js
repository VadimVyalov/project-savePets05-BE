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
  name: Joi.string().min(2).max(16).required().messages({
    "string.min":
      "Field 'name' length must be less than or equal to {{#limit}} characters long",
    "string.max":
      "Field 'name' length must be less than or equal to {{#limit}} characters long",
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
    "string.empty":
      "Field 'password' must contain minimum 6 characters, maximum 16, at least 1 uppercase letter, 1 lowercase letter and 1 digit with no symbols",
  }),
});

const infoSchema = Joi.object({
  name: Joi.string().min(2).max(16).messages({
    "string.min":
      "Field 'name' length must be more than or equal to {{#limit}} characters long",
    "string.max":
      "Field 'name' length must be less than or equal to {{#limit}} characters long",
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
  city: Joi.string().messages({
    "string.min":
      "Field 'city' length must be more than or equal to {{#limit}} characters long",
    "string.max":
      "Field 'city' length must be less than or equal to {{#limit}} characters long",
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
