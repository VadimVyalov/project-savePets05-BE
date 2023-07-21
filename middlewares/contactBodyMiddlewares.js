const {
  catchAsync,
  appError,
  contactSchema,
  favoriteSchema,
} = require("../utils");

const validateContactBody = catchAsync(async (req, _, next) => {
  const bodyNoKey = [];
  const bodyData = Object.keys(req.body);

  if (!bodyData.length) throw appError(400, "missing fields");

  if (!bodyData.includes("name")) bodyNoKey.push("name");
  if (!bodyData.includes("email")) bodyNoKey.push("email");
  if (!bodyData.includes("phone")) bodyNoKey.push("phone");

  if (bodyNoKey.length)
    throw appError(
      400,
      `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
    );
  const { error } = contactSchema.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const validateFavorite = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("favorite"))
    throw appError(400, `missing field favorite`);

  const { error } = favoriteSchema.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

module.exports = { validateContactBody, validateFavorite };
