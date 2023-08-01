const validateNotice = require("./noticeMiddlewares");
const validatePet = require("./petMiddlewares");
const userValidate = require("./userMiddlewares");
//const authUser = require("./authMiddelewares");
const authUser = require("./auth");

module.exports = {
  validateNotice,
  validatePet,
  userValidate,
  authUser,
};
