const { noticesService } = require("../services");
const { catchAsync } = require("../utils");

class NoticesController {
  list = catchAsync(async (req, res) => {
    const { id } = req.user;
    const params = { id, ...req.query };
    const result = await noticesService.list(params);
    res.status(200).json(result);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await noticesService.getById(id);
    res.status(200).json(result);
  });

  remove = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await noticesService.remove(id);
    res.status(200).json(result);
  });

  add = catchAsync(async (req, res) => {
    const { id: owner } = req.user;
    const result = await noticesService.add({ ...req.body, owner });
    res.status(201).json(result);
  });

  updateFavorite = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await noticesService.update(id, req.body);
    res.status(200).json(result);
  });

  updateStatusContact = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await noticesService.update(id, req.body);
    res.status(200).json(result);
  });
}
const noticesController = new NoticesController();

module.exports = noticesController;
