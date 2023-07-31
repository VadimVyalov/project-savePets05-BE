const { Router } = require("express");
const { petsController } = require("../../controllers");

const { authUser, validatePet } = require("../../middlewares");

const router = Router();

// === Autorize

router.post(
  "/",
  authUser.access,
  validatePet.upload,
  validatePet.body,
  petsController.add
);
router.get("/", authUser.info, validatePet.query, petsController.list);
router.delete(
  "/:id",
  authUser.access,
  validatePet.checkId,
  petsController.remove
);

module.exports = router;
