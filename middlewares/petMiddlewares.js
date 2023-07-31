const { catchAsync, appError } = require("../utils");
const { isValidObjectId } = require("mongoose");
const moment = require("moment");
const { PET_BODY, SEX } = require("../config");
const CloudinaryService = require("../services/cloudinaryServices");
const { petValidationSchema } = require("../validationShems");

class ValidatePet {
  body = catchAsync(async (req, _, next) => {
    const bodyData = Object.keys(req.body);
    if (!req.file) throw appError(400, "missing field 'pet' ");

    if (!bodyData.length) throw appError(400, "missing fields");

    const bodyNoKey = PET_BODY.filter((fild) => !bodyData.includes(fild));


    if (bodyNoKey.length)
      //price
      throw appError(
        400,
        `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
      );

    //   const bodyKey = PET_BODY.filter((fild) => bodyData.includes(fild));
    //  console.log(bodyKey)
    const { error } = petValidationSchema.add.validate(req.body);
    if (error) throw appError(400, error.message);

    next();
  });

  query = catchAsync(async (req, _, next) => {
    const { page, limit } = req.query;

    req.query = {};

    if (typeof page !== "undefined")
      if (+page < 1) throw appError(404, "page must be more 0");

    if (typeof limit !== "undefined")
      if (+limit < 1) throw appError(404, "limit must be more 0");

    if (typeof page !== "undefined" && typeof limit === "undefined")
      throw appError(404, "page without limit");

    //=======

    if (typeof limit !== "undefined") req.query.pagination = { limit };
    if (typeof page !== "undefined" && typeof limit !== "undefined") {
      const skip = (+page - 1) * +limit;
      req.query.pagination = { ...req.query.pagination, skip };
    }

    next();
  });

  checkId = catchAsync(async (req, _, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw appError(400, "id no valid by pet");
    next();
  });
  upload = CloudinaryService.upload("pet");
}
const validatePet = new ValidatePet();
module.exports = validatePet;
