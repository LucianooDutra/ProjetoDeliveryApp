import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function AddressCheckoutItemsTable({ sellers }) {
  const {
    funcs: { setAddress, setAddressNumber, setSellerSelected },
    vars: { address, addressNumber },
  } = useContext(Context);

  useEffect(() => {
    setSellerSelected(sellers[0]?.id);
    console.log(sellers[0]?.id);
  }, [sellers, setSellerSelected]);

  return (
    <table>
      <tr>
        <th>P. Vendedora Responsável</th>
        <th>Endereço</th>
        <th>Número</th>
      </tr>
      <select
        data-testid="customer_checkout__select-seller"
        onChange={ ({ target: { value } }) => setSellerSelected(value) }
        id="pVendedora-nome"
        name="pVendedora"
      >
        {
          sellers?.map(
            (seller) => (
              <option
                key={ seller.name }
                value={ seller.id }
              >
                {seller.name}
              </option>),
          )
        }
      </select>
      <input
        data-testid="customer_checkout__input-address"
        onChange={ ({ target: { value } }) => setAddress(value) }
        type="text"
        value={ address }
      />
      <input
        data-testid="customer_checkout__input-address-number"
        onChange={ ({ target: { value } }) => setAddressNumber(value) }
        type="text"
        value={ addressNumber }
      />
    </table>
  );
}

AddressCheckoutItemsTable.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default AddressCheckoutItemsTable;
