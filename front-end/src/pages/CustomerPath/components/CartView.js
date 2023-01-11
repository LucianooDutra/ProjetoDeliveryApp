import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function CartView() {
  const history = useHistory();
  const [totalQuantity, setTotalQuantity] = useState(0);

  const calculateTotal = async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    const ShoppingCartLocalStore = JSON.parse(localStorage.getItem(user.email));
    if (!ShoppingCartLocalStore) return setTotalQuantity('0.00');
    const total = ShoppingCartLocalStore.map((e) => Number(e.price) * e.quantity);
    const totalToString = total.reduce((prev, curr) => prev + curr).toFixed(2);
    return setTotalQuantity(totalToString.replace(/\./, ','));
  };
  useEffect(() => {
    calculateTotal();
  });

  return (
    <button
      type="button"
      disabled={ totalQuantity === '0.00' }
      data-testid="customer_products__button-cart"
      className="customer_products__button-cart p-4 m-6 border-b-2 border-t-2 border-indigo-500 "
      onClick={ () => history.push('/customer/checkout') }
    >
      <p
        data-testid="customer_products__checkout-bottom-value"
        className="customer_products__checkout-bottom-value"
      >
        Ver carrinho: R$
        { ' ' }
        { totalQuantity }
      </p>
    </button>
  );
}

export default CartView;
