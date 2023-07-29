const validateNotice = require("./noticeMiddlewares");
const validatePet = require("./petMiddlewares");

const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
} = require("./userMiddlewares");
const { auth } = require("./auth");
const {
  authAccess,
  authRefresh,
  checkUser,
  authUser,
} = require("./authMiddelewares");

module.exports = {
  validateNotice,
  validatePet,
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
  authAccess,
  authRefresh,
  checkUser,
  authUser,
};
