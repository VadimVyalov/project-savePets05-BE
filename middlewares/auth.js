const { catchAsync, appError } = require("../utils");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const auth = catchAsync(async (req, _, next) => {
  const { JWT_ACCESS_SECRET } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ") || "";

  if (bearer !== "Bearer") throw appError(401, "Not authorized");

  const id = jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) throw appError(401, "Not authorized");
    return decoded.id;
  });

  const user = await User.findById(id).select(["token"]);

  if (!user || !user.token || user.token !== token)
    throw appError(401, "Not authorized");
  user.token = undefined;
  req.user = { id };
  next();
});

module.exports = {
  auth,
};
