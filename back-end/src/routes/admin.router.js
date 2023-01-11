const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const adminRouter = express.Router();

adminRouter
  .get('/user', authAdmin, adminController.getAllUsers)
  .post('/user', authAdmin, adminController.createUser)
  .delete('/user', authAdmin, adminController.deleteUser);

module.exports = adminRouter;