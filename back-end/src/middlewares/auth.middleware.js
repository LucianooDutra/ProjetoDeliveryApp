const auth = require('../utils/auth');
const ErrorGenerator = require('../utils/errorGenerator');

const TOKEN_NOT_FOUND = 'Token não encontrado';

const authGeneric = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorGenerator(401, TOKEN_NOT_FOUND);
  }

  try {
    const user = auth.authorization(authorization);
    req.user = user;
    next();
  } catch (err) {
    throw new ErrorGenerator(401, TOKEN_NOT_FOUND);
  }
};

const authAdmin = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorGenerator(401, TOKEN_NOT_FOUND);
  }
  try {
    const user = auth.authorization(authorization);
    if (user.role === 'administrator') {
      req.user = user;
      return next();
    }
    throw new ErrorGenerator(401, 'Token inválido');
  } catch (err) {
    next(err);
  }
};

const authSeller = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorGenerator(401, TOKEN_NOT_FOUND);
  }
  try {
    const user = auth.authorization(authorization);
    if (user.role === 'seller') {
      req.user = user;
      return next();
    }
    throw new ErrorGenerator(401, 'Token inválido');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authGeneric,
  authAdmin,
  authSeller,
};