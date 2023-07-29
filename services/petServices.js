const Pet = require("../models/petModel");
const { appError } = require("../utils");
const CloudinaryService = require("./cloudinaryServices");
const moment = require("moment");

class PetService {
  /**
   * add new pet to db
   */

  add = async (body, file) => {
    if (!file) throw appError(401, "File is require!");

    const photoUrl = await CloudinaryService.save(file, {}, "pets");
    body.birthday = body.birthday.split("-").reverse().join("-");
    const pet = await Pet.create({ ...body, photoUrl });

    if (!pet) throw appError(400, "Error add pet");

    const { name, birthday, type, comments } = pet.toObject();

    return {
      name,
      birthday: moment(birthday).format("DD-MM-YYYY"),
      type,
      photoUrl,
      comments,
    };
  };

  /**
   * Get user info and her list pet from db
   */

  list = async (params, user) => {
    const { pagination = null } = params;
    const { id: userId = null, ...userInfo } = user;
    const result = {};
    const query = {};

    userInfo.birthday = moment(userInfo.birthday).format("DD-MM-YYYY");
    result.user = userInfo;

    query.deleted = false;
    query.owner = userId;
    // console.log(query);

    const total = await Pet.find({ ...query });

    if (!total?.length) return { ...result, total: 0, pet: [] };

    const pet = await Pet.find({ ...query }, null, pagination)
      .sort("-updatedAt")
      .select("_id   birthday location  photoUrl name");

    if (!pet) throw appError(404, "Error get pet");

    result.total = total.length;
    result.pet = pet.map((e) => {
      const { _id: id, ...result } = e.toObject();
      return {
        id,
        ...result,
        birthday: moment(pet.birthday).format("DD-MM-YYYY"),
      };
    });

    return result;
  };

  /**
   * remove owner pet by id from db
   * @param {string} noticeId - notice id
   * @param {string} userId - user id
   *
   */

  remove = async (petId, userId) => {
    const pet = await Pet.findOneAndUpdate(
      { _id: petId, owner: userId, deleted: false },
      { deleted: true }
    );

    if (!pet) throw appError(404, "Error get pet");

    const result = { id: petId, deleted: pet.deleted };
    return result;
  };

  //TODO >>>>>>>>>>>>>>>>>>
  /**
   * update exist pet in db
   * @param {object} body {} new notice data
   *
   */

  update = async (id, body) => {
    try {
      return await Pet.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      console.log(error);
    }
  };
  //TODO <<<<<<<<<<<<<<<<<<
}
const petService = new PetService();

module.exports = petService;
