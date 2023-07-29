const { petService } = require("../services");
const { catchAsync } = require("../utils");

const PetController = class {
  list = catchAsync(async (req, res) => {
    const { query, user } = req;

    const result = await petService.list(query, user);

    res.status(200).json(result);
  });

  remove = catchAsync(async (req, res) => {
    const { id: petId } = req.params;
    const { id: userId } = req.user;
    const result = await petService.remove(petId, userId);
    res.status(200).json(result);
  });

  add = catchAsync(async (req, res) => {
    const { id: owner } = req.user;
    const result = await petService.add({ ...req.body, owner }, req.file);
    res.status(201).json(result);
  });
};

const petController = new PetController();

module.exports = petController;
