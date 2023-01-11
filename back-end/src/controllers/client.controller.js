const saleService = require('../services/sale.service');

const createSale = async (req, res, next) => {
  const userId = req.user.sub;
  const 
  { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
  try {
    const saleId = await saleService.createSale({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
    });
    return res.status(201).json({ id: saleId });
  } catch (err) {
    next(err);
  }
};

const getSales = async (req, res, next) => {
  const userId = req.user.sub;
  try {
    const sales = await saleService.getSaleByUserId(userId);
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const getSaleDetails = async (req, res, next) => {
  const userId = req.user.sub;
  const { id } = req.params;
  try {
    const saleDetails = await saleService.userSaleDetails(id, userId);
    return res.status(200).json(saleDetails);
  } catch (err) {
    next(err);
  }
};

const updateSaleStatus = async (req, res, next) => {
  const userId = req.user.sub;
  const { id } = req.params;
  try {
    const update = await saleService.updateSaleStatusDelivered(id, userId);
    return res.status(201).json(update);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleDetails,
  updateSaleStatus,
};
