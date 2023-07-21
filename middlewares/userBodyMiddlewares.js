const {
  catchAsync,
  appError,
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifySchema,
} = require("../utils");
const ImageService = require("../services/ImageService");

const validateRegisterBody = catchAsync(async (req, _, next) => {
  const bodyNoKey = [];
  const bodyData = Object.keys(req.body);

  if (!bodyData.length) throw appError(400, "missing fields");
  if (!bodyData.includes("email")) bodyNoKey.push("email");
  if (!bodyData.includes("password")) bodyNoKey.push("password");

  if (bodyNoKey.length)
    throw appError(
      400,
      `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
    );

  const { error } = registerSchema.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const validateLoginBody = catchAsync(async (req, _, next) => {
  const bodyNoKey = [];
  const bodyData = Object.keys(req.body);

  if (!bodyData.length) throw appError(400, "missing fields");
  if (!bodyData.includes("email")) bodyNoKey.push("email");
  if (!bodyData.includes("password")) bodyNoKey.push("password");

  if (bodyNoKey.length)
    throw appError(
      400,
      `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
    );

  const { error } = loginSchema.validate(req.body);
  if (error) throw appError(400, error.message);
  next();
});

const validateSubscription = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("subscription"))
    throw appError(400, `missing field subscription`);

  const { error } = subscriptionSchema.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const validateVerify = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("email"))
    throw appError(400, `missing field email`);

  const { error } = verifySchema.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const uploadUserAvatar = ImageService.upload("avatar");

module.exports = {
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
  validateVerify,
  uploadUserAvatar,
};
