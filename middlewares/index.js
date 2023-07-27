const validateNotice = require("./noticeMiddlewares");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
} = require("./userMiddlewares");
const { auth } = require("./auth");
const { authAccess, authRefresh } = require("./authMiddelewares");

module.exports = {
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
  authAccess,
  authRefresh,
  validateNotice,
};
