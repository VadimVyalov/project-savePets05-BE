const User = require("../models/userSchema");
const { catchAsync, appError, sendEmail } = require("../utils");

const userService = require("../services/userServices");
class UserController {
  registration = catchAsync(async (req, res) => {
    const result = await userService.registration(req.body);

    const { user, verificationToken } = result;

    //await sendEmail(user.email, verificationToken);

    req.body = undefined;

    res.status(201).json({ user });
  });

  login = catchAsync(async (req, res) => {
    const result = await userService.login(req.body);

    req.body = undefined;
    res.status(200).json(result);
  });

  refresh = catchAsync(async (req, res) => {
    const { id } = req.user;

    const token = await userService.refresh(id);

    res.status(200).json({ token });
  });

  logout = catchAsync(async (req, res) => {
    const { id } = req.user;

    await userService.logout(id);

    res.status(204).json();
  });

  current = async (req, res) => {
    const { id } = req.user;
    const user = await userService.current(id);
    // console.log(user);
    res.status(200).json(user);
  };

  updateInfo = async (req, res) => {
    const { id } = req.user;

    await userService.updateInfo(id, req.body);

    res.status(200).json({ message: `User info succesfull updated ` });
  };

  updateAvatar = async (req, res) => {
    const { id } = req.user;
    const { file } = req;

    const avatarURL = await userService.updateAvatar(id, file);

    res.status(200).json({
      avatarURL,
    });
  };

  sendVerify = catchAsync(async (req, res) => {
    const { email } = req.body;

    await userService.sendVerify(email);

    res.status(200).json({
      message: "Verification email sent",
    });
  });

  verifyEmail = catchAsync(async (req, res) => {
    const { verificationToken } = req.params;

    await userService.verifyEmail(verificationToken);

    return res.status(200).json({ message: "Verification successful" });
  });
}
const userController = new UserController();
module.exports = userController;
