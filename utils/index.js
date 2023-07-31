const appError = require("./appError");
const mongooseError = require("./mongooseError");
const catchAsync = require("./catchAsync");
const birthday2age = require("./birthday2age");
const { sendEmail } = require("./sendMail");

module.exports = {
  appError,
  mongooseError,
  catchAsync,
  birthday2age,
  sendEmail,
};
