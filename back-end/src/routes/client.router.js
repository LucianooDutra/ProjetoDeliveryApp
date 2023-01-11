const express = require('express');
const clientController = require('../controllers/client.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const Router = express.Router();

Router
  .post('/sale', authMiddleware.authGeneric, clientController.createSale)
  .get('/sale', authMiddleware.authGeneric, clientController.getSales)
  .get('/sale/details/:id', authMiddleware.authGeneric, clientController.getSaleDetails)
  .patch('/sale/:id/delivered', authMiddleware.authGeneric, clientController.updateSaleStatus);

module.exports = Router;