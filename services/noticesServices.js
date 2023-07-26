const Notices = require("../models/noticeModel");
const { appError } = require("../utils");
const CloudinaryService = require("./cloudinaryServices");
const moment = require("moment");
class NoticesService {
  /**
   * add new notice to db
   */

  add = async (body, file) => {
    if (!file) throw appError(401, "File is require!");
    const photoUrl = await CloudinaryService.save(file, {}, "notices");
    body.birthday = body.birthday.split("-").reverse().join("-");
    const notice = await Notices.create({ ...body, photoUrl });
    const { _id: id, owner, ...result } = notice.toObject();

    return { id, ...result };
  };

  /**
   * Get list notice from db
   */

  list = async (params) => {
    const {
      sex = null,
      title = null,
      category = null,
      birthday = null,
      pagination = null,
    } = params;

    const query = {};

    if (birthday) query.birthday = birthday;
    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: "i" };
    if (sex) query.sex = sex;

    const total = await Notices.find({ ...query });
    if (!total?.length) throw appError(404, "Not found");

    const notice = await Notices.find({ ...query }, null, pagination)
      .sort("-updatedAt")
      .select("-createdAt -updatedAt")
      .populate("owner", "-_id, email phone");

    const result = notice.map((e) => {
      const { _id: id, owner, ...result } = e.toObject();
      return {
        id,
        ...result,
        age: moment().diff(e.birthday, "month", false),
        birthday: moment(e.birthday).format("DD-MM-YYYY"),
        email: owner.email,
        phone: owner.phone,
      };
    });

    return { total: total.length, notice: result };
  };

  /**
   * Get unique notice by id from db
   * @param {string} id - search contact id
   *
   */

  getById = async (id) => {
    const result = await Notices.findById(id);

    if (!result) throw appError(404, "Not found");

    return result;
  };

  /**
   * remove unique  notice by id from db
   * @param {string} id - search contact id
   *
   */

  remove = async (id) => {
    try {
      await Notices.findByIdAndDelete(id);
      return { message: "contact deleted" };
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * update exist notice in db
   * @param {object} body {name, email, phone} new contact
   *
   */

  update = async (id, body) => {
    try {
      return await Notices.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      console.log(error);
    }
  };
}
const noticesService = new NoticesService();

module.exports = noticesService;
