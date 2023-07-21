const { catchAsync, appError } = require("../utils");
const { isValidObjectId } = require("mongoose");
/**
 * Check contact exists in db by id middleware.
 */

const checkById = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw appError(400, "id no valid");

  //  const contact = await getById(id);if (!contact) throw appError(404, "Not found");
  //

  next();
};

module.exports = { checkById };
