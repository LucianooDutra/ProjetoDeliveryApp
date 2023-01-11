const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const productRouter = express.Router();

productRouter.get('/', authMiddleware.authGeneric, productController.getAllProducts);

module.exports = productRouter;