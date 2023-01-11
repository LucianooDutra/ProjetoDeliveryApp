const md5 = require('md5');
const { User } = require('../database/models');
const { authentication, authorization } = require('../utils/auth');
const ErrorGenerator = require('../utils/errorGenerator');

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const createdUser = async (newUser) => {
  const user = await User.create(newUser);
  return user;
};

const login = async (dataUser) => {
  const user = await getUserByEmail(dataUser.email);
  if (!user) throw new ErrorGenerator(404, 'Usuário não encontrado!');
  const passwordHash = md5(dataUser.password);
  if (user.password !== passwordHash) throw new ErrorGenerator(404, 'Email ou senha inválida!');
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = authentication(payload);
  delete payload.sub;
  return { ...payload, token };
};

const register = async (dataUser) => {
  const user = await getUserByEmail(dataUser.email);
  if (user) throw new ErrorGenerator(409, 'Usuário já cadastrado!');
  const passwordHash = md5(dataUser.password);

  const newUser = await createdUser({ ...dataUser, password: passwordHash, role: 'customer' });
  const payload = {
    sub: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
  const token = authentication(payload);
  delete payload.sub;
  return { ...payload, token };
};

const getAuthorization = async (token) => authorization(token);

module.exports = {
  login,
  register,
  getAuthorization,
};
