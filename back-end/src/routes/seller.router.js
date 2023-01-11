const express = require('express');
const sellerController = require('../controllers/seller.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const Router = express.Router();

Router
  .patch('/sale/:id', authMiddleware.authSeller, sellerController.updateSaleStatus)
  .get('/sale', authMiddleware.authSeller, sellerController.getSales)
  .get('/sale/details/:id', authMiddleware.authSeller, sellerController.getSaleDetails)
  .get('/', authMiddleware.authGeneric, sellerController.getAllSellers);

module.exports = Router;
