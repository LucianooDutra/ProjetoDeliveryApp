const md5 = require('md5');
const { User } = require('../database/models');
const ErrorGenerator = require('../utils/errorGenerator');

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const createUser = async (dataUser) => {
  const { name, email, password, role } = dataUser;
  const user = await getUserByEmail(email);
  if (user) throw new ErrorGenerator(409, 'Usuário já cadastrado!');
  const passwordHash = md5(password);
  const newUser = await User.create({ name, email, password: passwordHash, role });
  return newUser;
};

const deleteUser = async (name, email) => {
  const user = await User.destroy({ where: [{ name }, { email }] });
  if (user) {
    return `O usuário ${name} foi deletado com sucesso`;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
};