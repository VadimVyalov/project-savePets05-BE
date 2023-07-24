const { Router } = require("express");
const { noticesController } = require("../../controllers");
const multer = require("multer");

const {
  checkById,
  validateNoticeBody,
  validateFavorite,
  authAccess,
  uploadNotice,
} = require("../../middlewares");

const router = Router();

router.use("/", authAccess);

//router.post("/", uploadNotice, validateNoticeBody);

router.route("/").post(uploadNotice, validateNoticeBody, noticesController.add);
//   .post(validateNoticeBody, noticesController.addContact)
//   .get(noticesController.listContacts);

// router.use("/:id", checkById);

// router
//   .route("/:id")
//   .get(noticesController.getById)
//   .delete(noticesController.removeContact)
//   .put(validateNoticeBody, noticesController.updateContact);

// router
//   .route("/:id/favorite")
//   .patch(validateFavorite, noticesController.updateStatusContact);

module.exports = router;
