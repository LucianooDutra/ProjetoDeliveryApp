const exemploPatchResponse = {};

const resultSaleDetails = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '1000.45',
  deliveryAddress: 'Rua da graça',
  deliveryNumber: '4232',
  saleDate: '2022-12-07T21:40:24.000Z',
  status: 'delivered',
  items: [
    {
      name: 'Skol Lata 250ml',
      quantity: 5,
      price: '2.20',
      subTotal: '11.00',
    },
    {
      name: 'Heineken 600ml',
      quantity: 1,
      price: '7.50',
      subTotal: '7.50',
    },
  ],
  sellerName: 'Fulana Pereira',
};

const resultSaleDetailsStatusIntransit = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '1000.45',
  deliveryAddress: 'Rua da graça',
  deliveryNumber: '4232',
  saleDate: '2022-12-07T21:40:24.000Z',
  status: 'inTransit',
  items: [
    {
      name: 'Skol Lata 250ml',
      quantity: 5,
      price: '2.20',
      subTotal: '11.00',
    },
    {
      name: 'Heineken 600ml',
      quantity: 1,
      price: '7.50',
      subTotal: '7.50',
    },
  ],
  sellerName: 'Fulana Pereira',
};

const customerUserLocalStorageMock = {
  name: 'Messi',
  email: 'messi@gmail.com',
  role: 'customer',
  token: 'token',
};

export {
  exemploPatchResponse,
  resultSaleDetails,
  resultSaleDetailsStatusIntransit,
  customerUserLocalStorageMock,
};
