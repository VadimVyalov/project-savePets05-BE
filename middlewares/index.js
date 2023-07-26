const { checkById } = require("./contactsMiddlewares");
const {
  validateNoticeBody,
  validateFavorite,
  uploadNotice,
  validateNoticeQuery,
} = require("./noticeMiddlewares");
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
  checkById,
  validateNoticeBody,
  validateFavorite,
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
  authAccess,
  authRefresh,
  uploadNotice,
  validateNoticeQuery,
  //ImageService,
};
