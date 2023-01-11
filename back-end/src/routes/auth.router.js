const express = require('express');
const authController = require('../controllers/auth.controller');
const validateDataMiddleware = require('../middlewares/validateData.middleware');

const Router = express.Router();

Router
  .post('/login', validateDataMiddleware.login, authController.login)
  .post('/register', validateDataMiddleware.register, authController.register)
  .post('/', authController.getAuthorization);

module.exports = Router;