const ErrorGenerator = require('../utils/errorGenerator');

const emailRegex = (email) => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

const validateEmail = (email) => {
  if (!email) {
    throw new ErrorGenerator(400, 'Email ausente');
  }
  if (!emailRegex(email)) {
    throw new ErrorGenerator(400, 'O "email" deve ter o formato "email@email.com"');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new ErrorGenerator(400, 'Senha ausente');
  }
  if (password.length < 6) {
    throw new ErrorGenerator(400, 'Senha no mínimo 6 caracteres');
  }
};

const validateName = (name) => {
  if (!name) {
    throw new ErrorGenerator(400, 'Name ausentes');
  }
  if (name.length < 12) {
    throw new ErrorGenerator(400, 'Name no mínimo 12 caracteres');
  }
};

const login = (req, _res, next) => {
  const { email, password } = req.body;
  validateEmail(email);
  validatePassword(password);
  next();
};

const register = (req, _res, next) => {
  const { email, password, name } = req.body;
  validateEmail(email);
  validatePassword(password);
  validateName(name);
  next();
};

module.exports = {
  login,
  register,
};