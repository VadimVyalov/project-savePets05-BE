const { catchAsync, appError } = require("../utils");
const User = require("../models/userModel");

const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtAccesStrategy = new Strategy(
  {
    secretOrKey: JWT_ACCESS_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  jwtVerify
);

const authAccess = catchAsync(async (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  passport.authenticate(
    jwtAccesStrategy,
    { session: false },
    (err, user, info) => {
      if (err || info || user?.token?.access !== token || !user?.token?.refresh)
        return next(appError(401, "Not authorized"));
      const { id } = user;
      req.user = { id };

      next();
    }
  )(req, res, next);
});

//  =============

const jwtRefreshStrategy = new Strategy(
  {
    secretOrKey: JWT_REFRESH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  jwtVerify
);

const authRefresh = catchAsync(async (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  passport.authenticate(
    jwtRefreshStrategy,
    { session: false },
    (err, user, info) => {
      if (err || info || user?.token?.refresh !== token || !user?.token?.access)
        return next(appError(401, "Not authorized"));
      const { id } = user;
      req.user = { id };

      next();
    }
  )(req, res, next);
});

//  ==============

const checkUser = catchAsync(async (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  passport.authenticate(
    jwtAccesStrategy,
    { session: false },
    (err, user, info) => {
      if (err || info || user?.token?.access !== token || !user?.token?.refresh)
        req.user = { id: null };
      else req.user = { id: user.id };

      next();
    }
  )(req, res, next);
});

const authUser = catchAsync(async (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  passport.authenticate(
    jwtAccesStrategy,
    { session: false },
    (err, user, info) => {
      if (err || info || user?.token?.access !== token || !user?.token?.refresh)
        return next(appError(401, "Not authorized"));

      const { _id, email, name, birthday, phone, city, avatarURL } = user;
      req.user = { id: _id, email, name, birthday, phone, city, avatarURL };

      next();
    }
  )(req, res, next);
});

module.exports = {
  authAccess,
  authRefresh,
  checkUser,
  authUser,
};
