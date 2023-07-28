const { userValidationSchema } = require("../validationShems");
const { catchAsync, appError } = require("../utils");
//const ImageService = require("../services/ImageService");
const CloudinaryService = require("../services/cloudinaryServices");

const validateRegisterBody = catchAsync(async (req, _, next) => {
  const bodyNoKey = [];
  const bodyData = Object.keys(req.body);

  if (!bodyData.length) throw appError(400, "missing fields");
  if (!bodyData.includes("name")) bodyNoKey.push("name");
  if (!bodyData.includes("email")) bodyNoKey.push("email");
  if (!bodyData.includes("password")) bodyNoKey.push("password");

  if (bodyNoKey.length)
    throw appError(
      400,
      `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
    );

  const { error } = userValidationSchema.register.validate(req.body);
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

  const { error } = userValidationSchema.login.validate(req.body);
  if (error) throw appError(400, error.message);
  next();
});

const validateUpdateInfo = catchAsync(async (req, _, next) => {
  const bodyNoKey = [];
  const bodyData = Object.keys(req.body);

  if (!bodyData.length) throw appError(400, "missing fields");
  // if (!bodyData.includes("email")) bodyNoKey.push("email");
  if (!bodyData.includes("name")) bodyNoKey.push("name");
  if (!bodyData.includes("birthday")) bodyNoKey.push("birthday");
  if (!bodyData.includes("phone")) bodyNoKey.push("phone");
  if (!bodyData.includes("city")) bodyNoKey.push("city");

  if (bodyNoKey.length)
    throw appError(
      400,
      `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
    );
  const { error } = userValidationSchema.info.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const validateVerify = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("email"))
    throw appError(400, `missing field email`);

  const { error } = userValidationSchema.verify.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const uploadUserAvatar = CloudinaryService.upload("avatar");

module.exports = {
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
};
