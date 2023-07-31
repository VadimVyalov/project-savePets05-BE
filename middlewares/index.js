const validateNotice = require("./noticeMiddlewares");
const validatePet = require("./petMiddlewares");
const userValidate = require("./userMiddlewares");
const authUser = require("./authMiddelewares");

module.exports = {
  validateNotice,
  validatePet,
  userValidate,
  authUser,
};
