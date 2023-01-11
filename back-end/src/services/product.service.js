const { Product } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  getAllProducts,
};