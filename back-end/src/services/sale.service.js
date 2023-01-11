const { Sale, SaleProduct, User, Product } = require('../database/models');
const ErrorGenerator = require('../utils/errorGenerator');

const SALE_NOT_FOUND = 'Venda não encontrada!';
const USER_NOT_FOUND = 'Usuário não encontrado!';

const findUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  if (user) {
    return user;
  }
  throw new ErrorGenerator(404, USER_NOT_FOUND);
};

const findProductIdByName = async (name) => {
  const product = await Product.findOne({
    where: { name },
  });
  if (product) {
    return product.id;
  }
  throw new ErrorGenerator(404, 'Produto não encontrado!');
};

const getProductsIds = async (products) => {
  const productsList = await Promise.all(
    products.map(async ({ name, quantity }) => {
      const productId = await findProductIdByName(name);
      return { productId, quantity };
    }),
  );
  return productsList;
};

const addProductsOnSale = async (productsList, sale) => {
  await Promise.all(
    productsList.map(async ({ productId, quantity }) => {
      await SaleProduct.create({ saleId: sale.id, productId, quantity });
    }),
  );
};

const createSale = async ({
  userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
}) => {
  if (products.length < 1) throw new ErrorGenerator(400, 'Escolha um produto!');
  const productsList = await getProductsIds(products);
  const sale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });
  await addProductsOnSale(productsList, sale);
  return sale.id;
};

const getSaleByUserId = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
    raw: true,
  });
  return sales;
};

const getSaleBySellerId = async (sellerId) => {
  const sales = await Sale.findAll({
    where: { sellerId },
    raw: true,
  });
  return sales;
};

const getSaleById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    raw: true,
  });
  return sale;
};

const findItems = async (saleProducts) => Promise.all(
  saleProducts.map(async ({ productId, quantity }) => {
    const { name, price } = await Product.findOne({
      where: { id: productId },
      raw: true,
    });
    return {
      name,
      quantity,
      price,
      subTotal: (Number(price) * Number(quantity)).toFixed(2),
    };
  }),
);

const userSaleDetails = async (saleId, userId) => {
  const sale = await getSaleById(saleId);
  if (!sale || (sale.userId !== userId)) throw new ErrorGenerator(400, SALE_NOT_FOUND);
  const saleProducts = await SaleProduct.findAll({
    where: { saleId },
    raw: true,
  });
  const items = await findItems(saleProducts);
  if (items.length < 1) throw new ErrorGenerator(400, SALE_NOT_FOUND);
  const seller = await findUserById(sale.sellerId);
  return {
    ...sale,
    items,
    sellerName: seller.name,
  };
};

const sellerSaleDetails = async (saleId, sellerId) => {
  const sale = await getSaleById(saleId);
  if (!sale || (sale.sellerId !== sellerId)) throw new ErrorGenerator(400, SALE_NOT_FOUND);
  const saleProducts = await SaleProduct.findAll({
    where: { saleId },
    raw: true,
  });
  const items = await findItems(saleProducts);
  if (items.length < 1) throw new ErrorGenerator(400, SALE_NOT_FOUND);
  return {
    ...sale,
    items,
  };
};

const updateSaleStatus = async (saleId, status, sellerId) => {
  const sale = await getSaleById(saleId);
  if (!sale || (sale.sellerId !== sellerId)) throw new ErrorGenerator(400, SALE_NOT_FOUND);
  if (status) throw new ErrorGenerator(400, 'Status inválido!');
  const [update] = await Sale.update({ status }, { where: { id: saleId } });
  if (update) return { message: 'Status atualizado com sucesso!' };
  throw new ErrorGenerator(400, 'Coloque um status diferente do status atual!');
};

const updateSaleStatusDelivered = async (saleId, userId) => {
  const sale = await getSaleById(saleId);
  if (!sale || (sale.userId !== userId)) throw new ErrorGenerator(400, SALE_NOT_FOUND);
  if (sale.status !== 'inTransit') {
    throw new ErrorGenerator(400, 'Não pode mudar status do pedido antes de sair para entrega!');
  }
  const [update] = await Sale.update({ status: 'delivered' }, { where: { id: saleId } });
  if (update) return { message: 'Status atualizado com sucesso!' };
  throw new ErrorGenerator(400, 'Coloque um status diferente do status atual!');
};

const getAllSellers = async () => {
  const sellers = await User.findAll({
    attributes: { exclude: ['password', 'role', 'email'] },
    where: { role: 'seller' },
  });
  if (sellers) {
    return sellers;
  }
  throw new ErrorGenerator(404, 'Usuário não encontrado!');
};

module.exports = {
  createSale,
  getSaleByUserId,
  getSaleBySellerId,
  userSaleDetails,
  sellerSaleDetails,
  updateSaleStatus,
  updateSaleStatusDelivered,
  getAllSellers,
};
