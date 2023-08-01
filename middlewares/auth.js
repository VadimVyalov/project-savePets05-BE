const { catchAsync, appError } = require("../utils");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

class Auth { 
  access = catchAsync(async (req, _, next) => {
  const { JWT_ACCESS_SECRET } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ") || "";

  if (bearer !== "Bearer") throw appError(401, "Not authorized");

  const id = jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) throw appError(401, "Not authorized");
    return decoded.id;
  });

  const user = await User.findById(id).select(["token"]);

  if (!user || user?.token?.access !== token ||
    !user?.token?.refresh)
    throw appError(401, "Not authorized");
    user.token.access = undefined;
    user.token.refresh = undefined;
  req.user = { id };
  next();
});

  refresh = catchAsync(async (req, _, next) => {
    const { JWT_REFRESH_SECRET } = process.env;
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ") || "";
  
    if (bearer !== "Bearer") throw appError(401, "Not authorized");
  
    const id = jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) throw appError(401, "Not authorized");
      return decoded.id;
    });
  
    const user = await User.findById(id).select(["token"]);
  
    if (!user ||  user?.token?.refresh !== token || !user?.token?.access)
      throw appError(401, "Not authorized");
      user.token.access = undefined;
      user.token.refresh = undefined;
    next();
});

check = catchAsync(async (req, _, next) => {
  const { JWT_ACCESS_SECRET } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ") || "";

  if (bearer !== "Bearer") throw appError(401, "Not authorized");

  const id = jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) throw appError(401, "Not authorized -3-");
    return decoded.id;
  });

  const user = await User.findById(id).select(["token"]);

  if (!user || user?.token?.access !== token ||!user?.token?.refresh)
    req.user = { id: null }
      else req.user = { id };

      user.token.access = undefined;
      user.token.refresh = undefined;
 // req.user = { id };
  next();
});

info = catchAsync(async (req, _, next) => {
  const { JWT_ACCESS_SECRET } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ") || "";

  if (bearer !== "Bearer") throw appError(401, "Not authorized");

  const id = jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) throw appError(401, "Not authorized");
    return decoded.id;
  });

  const user = await User.findById(id).select(["token"]);

  if (!user || user?.token?.access !== token ||
    !user?.token?.refresh)
    throw appError(401, "Not authorized");

    const { _id, email, name, birthday, phone, city, avatarURL } = user;
    req.user = { id: _id, email, name, birthday, phone, city, avatarURL };

  user.token.access = undefined;
  user.token.refresh = undefined;
  req.user = { id };
  next();
});

}

const authUser= new Auth;
module.exports =   authUser;
