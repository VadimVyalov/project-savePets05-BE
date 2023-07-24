const { checkById } = require("./contactsMiddlewares");
const {
  validateNoticeBody,
  validateFavorite,
  uploadNotice,
} = require("./noticeBodyMiddlewares");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
} = require("./userBodyMiddlewares");
const { auth } = require("./auth");
const { authAccess, authRefresh } = require("./authAlt");

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
  //ImageService,
};
