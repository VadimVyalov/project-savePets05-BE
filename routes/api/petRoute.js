const { Router } = require("express");
const { petsController } = require("../../controllers");

const { authAccess, validatePet, authUser } = require("../../middlewares");

const router = Router();

// === Autorize

router.post(
  "/",
  authAccess,
  validatePet.upload,
  validatePet.body,
  petsController.add
);
router.get("/", authUser, validatePet.query, petsController.list);
router.delete("/:id", authAccess, validatePet.checkId, petsController.remove);

module.exports = router;
