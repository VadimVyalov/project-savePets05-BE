const { Router } = require("express");
const { noticesController } = require("../../controllers");
const multer = require("multer");

const {
  checkById,
  validateNoticeBody,
  validateFavorite,
  authAccess,
  uploadNotice,
  validateNoticeQuery,
} = require("../../middlewares");

const router = Router();

router.use("/", authAccess);

//router.post("/", uploadNotice, validateNoticeBody);

router
  .route("/")
  .post(uploadNotice, validateNoticeBody, noticesController.add)
  //   .post(validateNoticeBody, noticesController.add)
  .get(validateNoticeQuery, noticesController.list);

// router.use("/:id", checkById);

// router
//   .route("/:id")
//   .get(noticesController.getById)
//   .delete(noticesController.remove)
//   .put(validateNoticeBody, noticesController.update);

// router
//   .route("/:id/favorite")
//   .patch(validateFavorite, noticesController.updateFavorit);

module.exports = router;
