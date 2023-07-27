const validateNotice = require("./noticeMiddlewares");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
} = require("./userMiddlewares");
const { auth } = require("./auth");
const { authAccess, authRefresh, checkUser } = require("./authMiddelewares");

module.exports = {
  validateNotice,
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
  authAccess,
  authRefresh,
  checkUser,
};
