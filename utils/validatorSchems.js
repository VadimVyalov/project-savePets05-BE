const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
}).messages({
  "string.min":
    "Field 'name' length must be less than or equal to {{#limit}} characters long",
  "string.email":
    "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
  "string.pattern.base":
    "Field 'phone' has invalid phone number format. The format should be (XXX) XXX-XXXX.",
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  name: Joi.string(),
}).messages({
  "string.email":
    "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
  "string.min":
    "Field 'password' length must be less than or equal to {{#limit}} characters long",
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
}).messages({
  "string.email":
    "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
});

const verifySchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
}).messages({
  "string.email":
    "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
});

module.exports = {
  contactSchema,
  favoriteSchema,
  registerSchema,
  loginSchema,
  verifySchema,
};
