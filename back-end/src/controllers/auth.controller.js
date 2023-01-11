const authService = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const data = await authService.register({ email, password, name });
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const getAuthorization = async (req, res, next) => {
  try {
    const payload = await authService.getAuthorization(req.body.token);
    return res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  getAuthorization,
};