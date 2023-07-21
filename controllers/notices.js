const { noticesService } = require("../services");
const { catchAsync } = require("../utils");

class NoticesController {
  listContacts = catchAsync(async (req, res) => {
    const { id } = req.user;
    const params = { id, ...req.query };
    const result = await contactService.list(params);
    res.status(200).json(result);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await contactService.getById(id);
    res.status(200).json(result);
  });

  removeContact = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await contactService.remove(id);
    res.status(200).json(result);
  });

  addContact = catchAsync(async (req, res) => {
    const { id: owner } = req.user;
    const result = await contactService.add({ ...req.body, owner });
    res.status(201).json(result);
  });

  updateContact = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await contactService.update(id, req.body);
    res.status(200).json(result);
  });

  updateStatusContact = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await contacts.update(id, req.body);
    res.status(200).json(result);
  });
}
const noticesController = new NoticesController();

module.exports = noticesController;
