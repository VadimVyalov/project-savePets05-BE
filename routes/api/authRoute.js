const { Router } = require("express");
const { userController } = require("../../controllers");
const { authUser, userValidate } = require("../../middlewares");

const router = Router();

router.post(
  "/register",
  userValidate.registration,
  userController.registration
);
router.post("/login", userValidate.login, userController.login);
router.post("/refresh", authUser.refresh, userController.refresh);

 router.post("/verify", userValidate.validateVerify, userController.sendVerify);
 router.get("/verify/:verificationToken", userController.verifyEmail);

router.use("/", authUser.access);
router.get("/current", userController.current);
router.post("/logout", userController.logout);

router.patch("/info", userValidate.update, userController.updateInfo);
router.patch("/avatars", userValidate.upload, userController.updateAvatar);

module.exports = router;
