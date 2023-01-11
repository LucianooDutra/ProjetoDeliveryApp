const JWT = require('jsonwebtoken');
const fs = require('fs');

const jwtKey = fs
  .readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' });

const authentication = (payload) => {
  const token = JWT.sign(payload, jwtKey);
  return token;
};

const authorization = (token) => {
  const user = JWT.verify(token, jwtKey);
  return user;
};

module.exports = {
  authentication,
  authorization,
};