// class AppError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }
const appError = (status, message) => {
  const error = new Error();
  error.status = status;
  if (message) error.message = message;

  return error;
};

module.exports = appError;
