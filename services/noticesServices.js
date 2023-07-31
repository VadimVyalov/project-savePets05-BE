const Notices = require("../models/noticeModel");
const User = require("../models/userModel");
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

  list = async (userId, params) => {
    const { pagination = null, ...query } = params;
    query.deleted = false;

    const favorites = [];
    const user = await User.findById(userId);
    if (userId) if (!user) throw appError(404, "Error get user favorite");
    if (user?.favorites?.length) favorites.push(...user.favorites);

    const total = await Notices.find({ ...query });
    if (!total?.length) throw appError(404, "Not found");

    const notice = await Notices.find({ ...query }, null, pagination)
      .sort("-updatedAt")
      .select("_id category sex birthday location title photoUrl follower")
      .populate("owner", "_id");

    if (!notice) throw appError(404, "Error get notice");

    const result = notice.map((e) => {
      const { _id: id, birthday, owner, ...result } = e.toObject();

      return {
        id,
        ...result,
        favorite: favorites.some((e) => e.equals(id)),
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
      favorite: owner.favorites?.some((e) => e.equals(id)),
      owner: owner._id.toString() === userId,
    };
  };

  /**
   * Get owner notices from db
   * @param {string} owner -  owner id
   *
   */

  getByOwner = async (userId, params) => {
    const { pagination, ...query } = params;
    query.deleted = false;
    query.owner = userId;

    const total = await Notices.find({ ...query });
    if (!total) throw appError(404, "Not found");

    const notice = await Notices.find({ ...query }, null, pagination)
      .select("_id category sex birthday location title photoUrl follower")
      .populate("owner", "favorites");

    if (!notice) throw appError(404, "Error get notice");

    const result = notice.map((e) => {
      const { _id: id, birthday, owner, ...result } = e.toObject();

      return {
        id,
        ...result,
        favorite: owner.favorites.some((e) => e.equals(id)),
        age: birthday2age(birthday),
        owner: true,
      };
    });

    return { total: total.length, notice: result };
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
    return await Notices.findByIdAndUpdate(id, body, { new: true });
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

    let follow = {};
    const user = await User.findById(userId);

    if (!user) throw appError(404, "Error get user favorite");
    const { favorites = [] } = user;
    follow = { $pull: { favorites: noticeId } };
    if (!favorites.includes(noticeId))
      follow = { $push: { favorites: noticeId } };

    const notice = await User.findByIdAndUpdate(userId, follow, {
      new: true,
    }).select("-createdAt -updatedAt");

    if (!notice) appError(404, "Error follow user notice");

    const result = {
      id: noticeId,
      favorite: notice.favorites.includes(noticeId),
    };

    return result;
  };

  /**
   * Get favorite notices from db
   * @param {string} userId -  user id
   *
   */

  favorite = async (userId, params) => {
    const { pagination, ...query } = params;

    const total = await User.findById(userId).populate({
      path: "favorites",
      match: query,
    });

    if (!total) throw appError(404, "Get favorite wrong");

    const user = await User.findById(userId).populate({
      path: "favorites",
      select: "_id category sex birthday location title photoUrl deleted ",
      match: query,
      ...pagination,
    });

    if (!user) throw appError(404, "Get favorite wrong");

    const notice = user.favorites;

    const result = notice.map((e) => {
      const { _id: id, birthday, ...result } = e.toObject();

      return {
        id,
        ...result,
        favorite: true,
        age: birthday2age(birthday),
      };
    });

    return { total: total.favorites.length, notice: result };
  };
}
const noticesService = new NoticesService();

module.exports = noticesService;
