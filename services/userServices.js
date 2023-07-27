const User = require("../models/userModel");
const { appError } = require("../utils");
const ImageService = require("./ImageService");
const CloudinaryService = require("./cloudinaryServices");
const moment = require("moment");
class UserServuces {
  registration = async (body) => {
    const { TOKEN } = require("../config/config");
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

    const token = {};

    const checkUser = await User.findOne({ email: body.email });
    if (checkUser) throw appError(409, "Email in use...");

    const user = await User.create({ ...body, verificationToken: "qwe" });

    token.access = await user.getToken(JWT_ACCESS_SECRET, TOKEN.access);
    if (!token.access) throw appError(401, "Refresh denied");

    token.refresh = await user.getToken(JWT_REFRESH_SECRET, TOKEN.refresh);
    if (!token.refresh) throw appError(401, "Refresh denied");

    const { name, email, id } = user;
    //console.log(token);
    await User.findByIdAndUpdate(id, {
      token,
    });

    const result = {
      token,
      user: {
        email,
        name,
      },
    };
    return result;
    // return { user: { email, name } };
  };

  login = async (body) => {
    const { TOKEN } = require("../config/config");
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
    const { email, password } = body;
    const token = {};
    // console.log(moment("01-02-2000", "DD-MM-YYYY"));
    const user = await User.findOne({ email });
    if (!user) throw appError(401, "Email or password is wrong");

    const { name, id, verify } = user;
    // if (!verify) throw appError(401, "User not verify");

    const isValidPassword = await user.validPassword(password);
    if (!isValidPassword) throw appError(401, " Email or password is wrong");

    token.access = await user.getToken(JWT_ACCESS_SECRET, TOKEN.access);
    if (!token.access) throw appError(401, " Email or password is wrong");

    token.refresh = await user.getToken(JWT_REFRESH_SECRET, TOKEN.refresh);
    if (!token.refresh) throw appError(401, " Email or password is wrong");

    await User.findByIdAndUpdate(id, {
      token,
    });

    const result = {
      token,
      user: {
        email,
        name,
      },
    };
    return result;
  };

  refresh = async (id) => {
    const { TOKEN } = require("../config/config");
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

    const token = {};

    const user = await User.findById(id);
    if (!user) throw appError(401, "Refresh denied");

    token.access = await user.getToken(JWT_ACCESS_SECRET, TOKEN.access);
    if (!token.access) throw appError(401, "Refresh denied");

    token.refresh = await user.getToken(JWT_REFRESH_SECRET, TOKEN.refresh);
    if (!token.refresh) throw appError(401, "Refresh denied");

    await User.findByIdAndUpdate(id, {
      token,
    });

    return token;
  };

  logout = async (id) => {
    await User.findByIdAndUpdate(id, { token: "" });
  };

  current = async (id) => {
    let result = await User.findById(id).select([
      "-_id",
      "-token",
      "-password",
    ]);

    result = result.toObject();
    result.birthday = moment(result.birthday).format("DD-MM-YYYY");

    return result;
  };

  updateInfo = async (id, info) => {
    info.birthday = info.birthday.split("-").reverse().join("-");
    // console.log(moment(info.birthday).add(13, "M").format("DD-MM-YYYY"));
    const user = await User.findByIdAndUpdate(id, info, { new: true });
    if (!user) throw appError(401, "Update user info wrong");

    return user;
  };

  updateAvatar = async (id, file) => {
    if (!file) throw appError(401, "File is require!");

    const avatarURL = await CloudinaryService.save(file, {}, "avatars");

    const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
    if (!user) throw appError(401, "Update avatar wrong");
    return user.avatarURL;
  };

  sendVerify = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw appError(400);

    const { verificationToken, verify } = user;
    if (verify) throw appError(400, "Verification has already been passed");

    const info = await sendEmail(email, verificationToken);
    if (!info) throw appError(400, "Email send error");
  };

  verifyEmail = async (verificationToken) => {
    const user = await User.findOne({ verificationToken });
    if (!user) throw appError(404, "User not found");

    const { id } = user;

    await User.findByIdAndUpdate(id, {
      verify: true,
      verificationToken: null,
    });
  };
}

const userServices = new UserServuces();
module.exports = userServices;