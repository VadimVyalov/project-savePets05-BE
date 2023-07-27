const Notices = require("../models/noticeModel");
const { appError } = require("../utils");
const CloudinaryService = require("./cloudinaryServices");
const moment = require("moment");
const { CATEGORY } = require("../config");
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
      .select("_id category sex birthday location title photoUrl follower");

    const result = notice.map((e) => {
      const { _id: id, birthday, ...result } = e.toObject();
      const age =
        moment().diff(birthday, "year", false) < 1
          ? ` ${moment().diff(birthday, "month", false)} month`
          : moment().diff(birthday, "year", false) < 2
          ? `1 year`
          : `${moment().diff(birthday, "year", false)} years`;

      return {
        id,
        ...result,
        follower: e.follower.length,
        favorite: e.follower.includes(userId),
        age,
      };
    });

    return { total: total.length, notice: result };
  };

  /**
   * Get unique notice by id from db
   * @param {string} id -  notice id
   *
   */

  getById = async (id, userId) => {
    const result = await Notices.findById(id)
      .select("-createdAt -updatedAt -deleted")
      .populate("owner", "-_id, email phone");

    if (!result) throw appError(404, "Not found");

    const { _id, owner, ...notice } = result.toObject();

    return {
      ...notice,
      birthday: moment(notice.birthday).format("DD-MM-YYYY"),
      email: owner.email,
      phone: owner.phone,
      follower: notice.follower.length,
      favorite: notice.follower.includes(userId),
    };
  };

  /**
   * Get owner notices from db
   * @param {string} owner -  owner id
   *
   */

  getByOwner = async (owner) => {
    const notice = await Notices.find({ owner }).select(
      "-createdAt -updatedAt -owner"
    );

    if (!notice) throw appError(404, "Not found");

    const result = notice.map((e) => {
      const { _id: id, price, ...result } = e.toObject();
      if (result.category === CATEGORY[0]) result.price = price;
      return {
        id,
        ...result,
        birthday: moment(e.birthday).format("DD-MM-YYYY"),
        follower: e.follower.length,
      };
    });
    return result;
  };

  /**
   * remove owner notice by id from db
   * @param {string} noticeId - notice id
   * @param {string} userId - owner id
   *
   */

  remove = async (noticeId, userId) => {
    const result = await Notices.findOneAndUpdate(
      { _id: noticeId, owner: userId, deleted: false },
      { deleted: true }
    );

    if (!result) throw appError(404, "Not found");

    return { id: noticeId, deleted: result.deleted };
  };

  /**
   * update exist notice in db
   * @param {object} body {name, email, phone} new contact
   *
   */

  // update = async (id, body) => {
  //   try {
  //     return await Notices.findByIdAndUpdate(id, body, { new: true });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  follow = async (noticeId, userId) => {
    const notice = await Notices.findById(noticeId);
    if (!notice) throw appError(404, "Not found");

    const query = { follower: { $pull: { follower: userId } } };

    const { follower } = notice;

    if (!follower.includes(userId))
      query.follower = { $push: { follower: userId } };

    const result = await Notices.findByIdAndUpdate(noticeId, query.follower, {
      new: true,
    })
      .sort("-updatedAt")
      .select("-createdAt -updatedAt");

    if (!result) throw appError(404, "Not found");

    // const result = notice.map((e) => {
    //   const { _id: id, owner, ...result } = e.toObject();
    //   return {
    //     id,
    //     ...result,
    //     age: moment().diff(e.birthday, "month", false),
    //     birthday: moment(e.birthday).format("DD-MM-YYYY"),
    //     email: owner.email,
    //     phone: owner.phone,
    //   };
    // });

    return { result };
  };

  favorite = async (id) => {
    const result = await Notices.find({
      follower: { $elemMatch: { $eq: id } },
    }).select("-createdAt -updatedAt");

    return result;
  };
}
const noticesService = new NoticesService();

module.exports = noticesService;
