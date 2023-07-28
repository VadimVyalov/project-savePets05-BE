const Notices = require("../models/noticeModel");
const { appError, birthday2age } = require("../utils");
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
    if (!notice) throw appError(400, "Error add notice");

    const { _id: id, owner, ...result } = notice.toObject();

    return { id, ...result };
  };

  /**
   * Get list notices from db
   */

  list = async (params) => {
    const {
      sex = null,
      title = null,
      category = null,
      birthday = null,
      pagination = null,
      userId = null,
    } = params;

    const query = {};

    if (birthday) query.birthday = birthday;
    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: "i" };
    if (sex) query.sex = sex;
    query.deleted = false;

    const total = await Notices.find({ ...query });
    if (!total?.length) throw appError(404, "Not found");

    const notice = await Notices.find({ ...query }, null, pagination)
      .sort("-updatedAt")
      .select("_id category sex birthday location title photoUrl follower")
      .populate("owner", "id");

    if (!notice) throw appError(404, "Error get notice");

    const result = notice.map((e) => {
      const { _id: id, birthday, owner, ...result } = e.toObject();

      return {
        id,
        ...result,
        follower: e.follower.length,
        favorite: e.follower.includes(userId),
        age: birthday2age(birthday),
        owner: owner._id.toString() === userId,
      };
    });

    return { total: total.length, notice: result };
  };

  /**
   * Get unique notice by id from db
   * @param {string} id -  notice id
   *
   */

  getById = async (noticeId, userId) => {
    const result = await Notices.findById(noticeId)
      .select("-createdAt -updatedAt ")
      .populate("owner", "_id email phone");

    if (!result) throw appError(404, "Not found");

    const { _id: id, owner, ...notice } = result.toObject();

    return {
      id,
      ...notice,
      birthday: moment(notice.birthday).format("DD-MM-YYYY"),
      email: owner.email,
      phone: owner.phone,
      follower: notice.follower.length,
      favorite: notice.follower.includes(userId),
      owner: owner._id.toString() === userId,
    };
  };

  /**
   * Get owner notices from db
   * @param {string} owner -  owner id
   *
   */

  getByOwner = async (owner) => {
    const notice = await Notices.find({ owner, deleted: false }).select(
      "_id category sex birthday location title photoUrl follower"
    );

    if (!notice) throw appError(404, "Error get notice");

    const result = notice.map((e) => {
      const { _id: id, birthday, ...result } = e.toObject();

      return {
        id,
        ...result,
        follower: e.follower.length,
        favorite: e.follower.includes(owner),
        age: birthday2age(birthday),
        owner: true,
      };
    });

    return { total: result.length, notice: result };
  };

  /**
   * remove owner notice by id from db
   * @param {string} noticeId - notice id
   * @param {string} userId - user id
   *
   */

  remove = async (noticeId, userId) => {
    const notice = await Notices.findOneAndUpdate(
      { _id: noticeId, owner: userId, deleted: false },
      { deleted: true }
    );

    if (!notice) throw appError(404, "Error get notice");

    const result = { id: noticeId, deleted: notice.deleted };
    return result;
  };
  //TODO >>>>>>>>>>>>>>>>>>
  /**
   * update exist notice in db
   * @param {object} body {} new notice data
   *
   */

  update = async (id, body) => {
    try {
      return await Notices.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      console.log(error);
    }
  };
  //TODO <<<<<<<<<<<<<<<<<<
  /**
   * Change follower in notice
   * @param {string} noticeId - notice id
   * @param {string} userId - user id
   *
   */

  follow = async (noticeId, userId) => {
    const checkNotice = await Notices.findById(noticeId);
    if (!checkNotice) throw appError(404, "Error get notice");

    const query = { follower: { $pull: { follower: userId } } };

    const { follower } = checkNotice;

    if (!follower.includes(userId))
      query.follower = { $push: { follower: userId } };

    const notice = await Notices.findByIdAndUpdate(noticeId, query.follower, {
      new: true,
    })
      .sort("-updatedAt")
      .select("-createdAt -updatedAt");

    if (!notice) appError(404, "Error get notice");

    const result = { id: noticeId, favorite: notice.follower.includes(userId) };

    return result;
  };

  /**
   * Get favorite notices from db
   * @param {string} userId -  user id
   *
   */

  favorite = async (userId) => {
    const notice = await Notices.find({
      follower: { $elemMatch: { $eq: userId } },
    })
      .select("_id category sex birthday location title photoUrl follower")
      .populate("owner", "_id");

    if (!notice) throw appError(404, "Not found");

    const result = notice.map((e) => {
      const { _id: id, owner, birthday, ...result } = e.toObject();

      return {
        id,
        ...result,
        follower: e.follower.length,
        favorite: e.follower.includes(userId),
        age: birthday2age(birthday),
        owner: owner._id.toString() === userId,
      };
    });

    return { total: result.length, notice: result };
  };
}
const noticesService = new NoticesService();

module.exports = noticesService;
