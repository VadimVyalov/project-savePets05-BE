const { catchAsync, appError } = require("../utils");
const moment = require("moment");
const { NOTISE_BODY, CATEGORY, SEX } = require("../config");
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

const validateNoticeQuery = catchAsync(async (req, _, next) => {
  const { page, limit, startAge, endAge, sex, title, category } = req.query;

  req.query = {};

  if (typeof page !== "undefined")
    if (+page < 1) throw appError(404, "page must be more 0");
  if (typeof limit !== "undefined")
    if (+limit < 1) throw appError(404, "limit must be more 0");
  if (typeof page !== "undefined" && typeof limit === "undefined")
    throw appError(404, "page without limit");
  if (typeof startAge !== "undefined")
    if (+startAge < 0) throw appError(404, "startAge must be positive");
  if (typeof endAge !== "undefined")
    if (+endAge < 1) throw appError(404, "endAge must be more 0");
  if (typeof startAge !== "undefined" && typeof endAge !== "undefined")
    if (+startAge > +endAge)
      throw appError(404, "startAge must be less endAge");
  if (typeof sex !== "undefined")
    if (!SEX.includes(sex))
      throw appError(404, `sex must be on of the [ ${SEX} ]`);
  if (typeof category !== "undefined")
    if (!CATEGORY.includes(category))
      throw appError(404, `sategory must be on of the [ ${CATEGORY} ]`);

  //=======
  if (typeof startAge !== "undefined") {
    const startBirthday = moment()
      .utc()
      .subtract(+startAge, "month")
      .format("YYYY-MM-DD");
    req.query.birthday = { $lte: startBirthday };
  }

  if (typeof endAge !== "undefined") {
    const endBirthday = moment()
      .utc()
      .subtract(+endAge, "month")
      .format("YYYY-MM-DD");
    req.query.birthday = { ...req.query.birthday, $gte: endBirthday };
  }
  if (typeof limit !== "undefined") req.query.pagination = { limit };
  if (typeof page !== "undefined" && typeof limit !== "undefined") {
    const skip = (+page - 1) * +limit;
    req.query.pagination = { ...req.query.pagination, skip };
  }
  if (typeof title !== "undefined") req.query.title = title;
  if (typeof sex !== "undefined") req.query.sex = sex;
  if (typeof category !== "undefined") req.query.category = category;

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

module.exports = {
  validateNoticeBody,
  validateFavorite,
  uploadNotice,
  validateNoticeQuery,
};
