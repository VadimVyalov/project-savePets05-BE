const {
  catchAsync,
  appError,
  contactSchema,
  favoriteSchema,
} = require("../utils");
const { NOTISE_BODY } = require("../config/config");
const CloudinaryService = require("../services/cloudinaryServices");
//! category	обовʼязково обране 1 з 3 категорій (sell, lost-found, for-free) aбо my-pet
//! name	обовʼязкове, будь-які літери, мінімум 2 символи, максимум 16
//! date	обовʼязкове, дата в форматі DD-MM-YYYY
//! type	обовʼязкове, будь-які літери, мінімум 2 символи, максимум 16
//! file	обовʼязковe, обʼємом до 3Мб
//! sex	обовʼязкове для sell, lost-found, for-free, обирається 1 тип з 2х (male, female)
//! location	обовʼязкове для sell, lost-found, for-free. Строка в форматі Місто. Наприклад: Brovary, Kyiv, Akhtyrka, Sumy
//! price	обовʼязкове для sell, число більш 0
//! comments	опціональне, будь-які літери та символи. максимум 120

const validateNoticeBody = catchAsync(async (req, _, next) => {
  const bodyData = Object.keys(req.body);

  if (!req.file) throw appError(400, "missing field 'notice' ");

  if (!bodyData.length) throw appError(400, "missing fields");

  const bodyNoKey = NOTISE_BODY.filter((fild) => !bodyData.includes(fild));
  if (req.body?.category === "sell" && !bodyData.includes("price"))
    bodyNoKey.push("price");

  const ind = bodyData.indexOf("category");
  console.log(req.body?.category === "sell");

  if (bodyNoKey.length)
    //price
    throw appError(
      400,
      `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
    );

  // const { error } = contactSchema.validate(req.body);
  // if (error) throw appError(400, error.message);

  next();
});

const validateFavorite = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("favorite"))
    throw appError(400, `missing field favorite`);

  const { error } = favoriteSchema.validate(req.body);
  if (error) throw appError(400, error.message);

  next();
});

const uploadNotice = CloudinaryService.upload("notice");
module.exports = { validateNoticeBody, validateFavorite, uploadNotice };
