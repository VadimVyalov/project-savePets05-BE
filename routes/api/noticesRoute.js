const { Router } = require("express");
const { noticesController } = require("../../controllers");

const { authUser, validateNotice } = require("../../middlewares");

const router = Router();

// === Autorize

router.post(
  "/",

  authUser.access,
  validateNotice.upload,
  validateNotice.body,
  noticesController.add
);
router.get(
  "/myads",
  authUser.access,
  validateNotice.query,
  noticesController.getByOwner
);
router.get(
  "/favorite",
  authUser.access,
  validateNotice.query,
  noticesController.getFavorite
);
router.patch(
  "/favorite/:id",
  authUser.access,
  validateNotice.checkId,
  noticesController.follow
);
router.delete(
  "/:id",
  authUser.access,
  validateNotice.checkId,
  noticesController.remove
);

// === Not autorize
router.get(
  "/category",
  authUser.check,
  validateNotice.query,
  noticesController.list
);
router.get(
  "/categories/:category",
  authUser.check,
  validateNotice.query,
  validateNotice.params,
  noticesController.list
);
router.get(
  "/:id",
  authUser.check,
  validateNotice.checkId,
  noticesController.getById
);

module.exports = router;
