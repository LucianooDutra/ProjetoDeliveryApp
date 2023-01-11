const adminService = require('../services/admin.service');

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await adminService.createUser({ name, email, password, role });
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await adminService.deleteUser(name, email);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
};
