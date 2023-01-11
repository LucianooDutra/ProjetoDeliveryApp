import React from 'react';
import PropTypes from 'prop-types';

function TableDetails({ items }) {
  const dataUserLocalStorage = JSON.parse(localStorage.getItem('user'));
  const { role } = dataUserLocalStorage;

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody className="expensesTable">
        {items.map((item, index) => (
          <tr key={ index }>
            <td
              data-testid={
                `${role}_order_details__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={
                `${role}_order_details__element-order-table-name-${index}`
              }
            >
              {item.name}
            </td>
            <td
              data-testid={
                `${role}_order_details__element-order-table-quantity-${index}`
              }
            >
              {item.quantity}
            </td>
            <td
              data-testid={
                `${role}_order_details__element-order-table-unit-price-${index}`
              }
            >
              { `${Number(item.price).toLocaleString(
                'pt-br',
                { style: 'currency', currency: 'BRL' },
              )}` }
            </td>
            <td
              data-testid={
                `${role}_order_details__element-order-table-sub-total-${index}`
              }
            >
              { `${Number(item.subTotal).toLocaleString(
                'pt-br',
                { style: 'currency', currency: 'BRL' },
              )}` }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableDetails.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
  })).isRequired,
};

export default TableDetails;
