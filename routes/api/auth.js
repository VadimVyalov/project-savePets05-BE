const { Router } = require("express");
const { userController } = require("../../controllers");

const {
  validateLoginBody,
  validateRegisterBody,
  validateUpdateInfo,
  validateVerify,
  uploadUserAvatar,
  authAccess,
  authRefresh,
} = require("../../middlewares");

const router = Router();

router.post("/register", validateRegisterBody, userController.registration);
router.post("/login", validateLoginBody, userController.login);
router.post("/refresh", authRefresh, userController.refresh);

router.post("/verify", validateVerify, userController.sendVerify);
router.get("/verify/:verificationToken", userController.verifyEmail);

router.use("/", authAccess);
router.get("/current", userController.current);
router.post("/logout", userController.logout);

router.patch("/info", validateUpdateInfo, userController.updateInfo);
router.patch("/avatars", uploadUserAvatar, userController.updateAvatar);

module.exports = router;
