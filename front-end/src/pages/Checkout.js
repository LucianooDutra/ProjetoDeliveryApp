import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddressCheckoutItemsTable from '../components/AddressCheckoutItemsTable';
import CheckoutItemsTable from '../components/CheckoutItemsTable';
import Context from '../context/Context';
import api from '../services/requests';
import Navbar from './CustomerPath/components/Navbar';

function Checkout() {
  const [sellers, setSellers] = useState([]);
  const history = useHistory();

  const {
    vars: { address, addressNumber, sellerSelected },
  } = useContext(Context);
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const itemsCart = JSON.parse(localStorage.getItem(user.email));
    const obj = {
      sellerId: sellerSelected,
      totalPrice: itemsCart
        .reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0).toFixed(2),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: itemsCart,
    };
    await api.post(
      '/client/sale',
      { ...obj },
      { headers: { Authorization: user.token } },
    ).then((response) => {
      history.push(`/customer/orders/${response.data.id}`);
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const getSellers = async () => {
      await api.get('/seller', { headers: { Authorization: user.token } })
        .then((response) => setSellers(response.data));
    };
    getSellers();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>Finalizar Pedido</h1>
        <div>
          <CheckoutItemsTable />
        </div>
      </div>
      <div>
        <h1>Detalhes e Endereço para Entrega</h1>
        <AddressCheckoutItemsTable sellers={ sellers } />
        <button
          onClick={ handleSubmit }
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </>
  );
}
export default Checkout;
