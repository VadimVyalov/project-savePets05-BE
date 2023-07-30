const { Router } = require("express");
const { noticesController } = require("../../controllers");

const { checkUser, authAccess, validateNotice } = require("../../middlewares");

const router = Router();

// === Autorize

router.post(
  "/",

  authAccess,
  validateNotice.upload,
  validateNotice.body,
  noticesController.add
);
router.get(
  "/myads",
  authAccess,
  validateNotice.query,
  noticesController.getByOwner
);
router.get(
  "/favorite",
  authAccess,
  validateNotice.query,
  noticesController.getFavorite
);
router.patch(
  "/favorite/:id",
  authAccess,
  validateNotice.checkId,
  noticesController.follow
);
router.delete(
  "/:id",
  authAccess,
  validateNotice.checkId,
  noticesController.remove
);

// === Not autorize
router.get(
  "/category",
  checkUser,
  validateNotice.query,
  noticesController.list
);
router.get(
  "/categories/:category",
  checkUser,
  validateNotice.query,
  validateNotice.params,
  noticesController.list
);
router.get(
  "/:id",
  checkUser,
  validateNotice.checkId,
  noticesController.getById
);

module.exports = router;
