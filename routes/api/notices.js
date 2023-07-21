const { Router } = require("express");
const { noticesController } = require("../../controllers");

const {
  checkById,
  validateContactBody,
  validateFavorite,
  auth,
} = require("../../middlewares");

const router = Router();

router.use("/", auth);

router
  .route("/")
  .post(validateContactBody, noticesController.addContact)
  .get(noticesController.listContacts);

router.use("/:id", checkById);

router
  .route("/:id")
  .get(noticesController.getById)
  .delete(noticesController.removeContact)
  .put(validateContactBody, noticesController.updateContact);

router
  .route("/:id/favorite")
  .patch(validateFavorite, noticesController.updateStatusContact);

module.exports = router;
