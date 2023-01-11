import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function CheckoutItemsTable() {
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (!userLocalStorage) history.push('/');
    setUserEmail(userLocalStorage.email);
    const cartItemsLocalStorage = JSON.parse(
      localStorage.getItem(userLocalStorage?.email),
    );
    setCartItems(cartItemsLocalStorage);
  }, [history]);

  const handleRemoveItem = (id) => {
    const itemList = cartItems.filter((el) => el.id !== id);
    setCartItems(itemList);
    localStorage.setItem(userEmail, JSON.stringify(itemList));
  };
  function getTotalPrice(productsList) {
    return productsList?.reduce((acc, curr) => {
      acc += Number(curr.price) * curr.quantity;
      return acc;
    }, 0);
  }
  return cartItems && cartItems.length ? (
    <>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
          <th>Remover Item</th>
        </tr>
        {cartItems.map((item, index) => (
          <tr key={ index }>
            <td
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {item.quantity}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              {Number(
                item.price,
              ).toLocaleString('pt-br', {
                style: 'currency', currency: 'BRL',
              }).replace('R$', '')}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              {(Number(item.price) * item.quantity)
                .toLocaleString('pt-br', {
                  style: 'currency', currency: 'BRL',
                })
                .replace('R$', '')}
            </td>
            <td>
              <div
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                role="button"
                tabIndex={ 0 }
                onKeyDown={ (e) => {
                  if (e.key === 'Enter') {
                    handleRemoveItem(item.id);
                  }
                } }
                onClick={ () => handleRemoveItem(item.id) }
              >
                Remover
              </div>
            </td>
          </tr>
        ))}
      </table>
      <p data-testid="customer_checkout__element-order-total-price">
        {Number(getTotalPrice(cartItems))
          .toLocaleString('pt-br', {
            style: 'currency', currency: 'BRL',
          })
          .replace('R$', '') ?? '0,00'}
      </p>
    </>
  ) : (
    <p>Você não tem itens no seu carrinho</p>
  );
}

export default React.memo(CheckoutItemsTable);
