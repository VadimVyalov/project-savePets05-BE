const { noticesService } = require("../services");
const { catchAsync } = require("../utils");

class NoticesController {
  list = catchAsync(async (req, res) => {
    const query = req.query;
    query.deleted = false;
    if (req.user) query.userId = req.user.id;

    const result = await noticesService.list(query);
    res.status(200).json(result);
  });

  getByOwner = catchAsync(async (req, res) => {
    const { id: userId } = req.user;
    const query = req.query;

    const result = await noticesService.getByOwner(userId, query);

    // query.deleted = false;
    // query.owner = userId;
    // query.userId = userId;
    //const result = await noticesService.list(query);
    res.status(200).json(result);
  });

  getFavorite = catchAsync(async (req, res) => {
    const { id: userId } = req.user;
    const query = req.query;

    // query.userId = userId;
    // query.follower = { $elemMatch: { $eq: userId } };
    //const result = await noticesService.list(query);
    // const result = await noticesService.favorite(userId, query);

    const result = await noticesService.favoriteFromUser(userId, query);
    res.status(200).json(result);
  });

  listByCategory = catchAsync(async (req, res) => {
    const result = await noticesService.list(req.query);
    res.status(200).json(result);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await noticesService.getById(id, userId);
    res.status(200).json(result);
  });

  remove = catchAsync(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    const result = await noticesService.remove(noticeId, userId);
    res.status(200).json(result);
  });

  add = catchAsync(async (req, res) => {
    const { id: owner } = req.user;
    const result = await noticesService.add({ ...req.body, owner }, req.file);
    res.status(201).json(result);
  });

  follow = catchAsync(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    const result = await noticesService.follow2user(noticeId, userId);

    res.status(200).json(result);
  });
}

const noticesController = new NoticesController();

module.exports = noticesController;
