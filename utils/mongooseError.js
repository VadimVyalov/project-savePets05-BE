const mongooseError = (error, _, next) => {
  const { name, code = 0 } = error;
  error.status = 400;

  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    error.message = "Email in use";
  }

  if (name === "ValidationError" && code === 0) {
    error.status = 400;
    // error.message = "ValidationError";
  }

  next();
};

module.exports = mongooseError;
