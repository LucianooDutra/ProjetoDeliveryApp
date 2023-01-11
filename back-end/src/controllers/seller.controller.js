const saleService = require('../services/sale.service');

const getSaleDetails = async (req, res, next) => {
  const sellerId = req.user.sub;
  const { id } = req.params;
  try {
    const saleDetails = await saleService.sellerSaleDetails(id, sellerId);
    return res.status(200).json(saleDetails);
  } catch (err) {
    next(err);
  }
};

const getSales = async (req, res, next) => {
  const sellerId = req.user.sub;
  try {
    const sales = await saleService.getSaleBySellerId(sellerId);
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const updateSaleStatus = async (req, res, next) => {
  const sellerId = req.user.sub;
  const { id } = req.params;
  const { status } = req.body;
  try {
    const update = await saleService.updateSaleStatus(id, status, sellerId);
    return res.status(201).json(update);
  } catch (err) {
    next(err);
  }
};

const getAllSellers = async (_req, res, next) => {
  try {
    const allSellers = await saleService.getAllSellers();
    return res.status(200).json(allSellers);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSaleDetails,
  getSales,
  updateSaleStatus,
  getAllSellers,
};
