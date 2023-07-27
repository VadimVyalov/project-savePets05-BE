const { Router } = require("express");
const { noticesController } = require("../../controllers");

const {
  checkById,

  authAccess,
  validateNotice,
} = require("../../middlewares");

const router = Router();

// === Autorize

router.post(
  "/",
  authAccess,
  validateNotice.upload,
  validateNotice.body,
  noticesController.add
);
router.get("/myads", authAccess, noticesController.getByOwner);

router.get("/favorite", authAccess, noticesController.favorite);

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
router.get("/:id", validateNotice.checkId, noticesController.getById);
router.get("/", validateNotice.query, noticesController.list);
router.get(
  "/category/:category",
  validateNotice.query,
  validateNotice.params,
  noticesController.list
);

module.exports = router;
