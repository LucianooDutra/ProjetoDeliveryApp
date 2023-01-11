import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import api from '../services/requests';
import TableDetails from '../components/TableDetails';
import Navbar from './CustomerPath/components/Navbar';

function SellerOrderDetails() {
  const {
    funcs: { setErrorMsg },
  } = useContext(Context);
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const [items, setItems] = useState([]);

  const dataUserLocalStorage = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSale = async () => {
      await api.get(
        `/seller/sale/details/${id}`,
        { headers: { Authorization: dataUserLocalStorage.token } },
      ).then((response) => {
        console.log(response.data);
        const products = response.data.items.map(
          ({ name, price, quantity, subTotal }) => ({
            name,
            quantity,
            price,
            subTotal,
          }),
        );
        localStorage.setItem('saleDetails', JSON.stringify(response.data));
        setSale(response.data);
        setItems(products);
      }).catch((err) => {
        if (err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('Problema ao buscar venda!');
        }
      });
    };

    fetchSale();
  }, [id, setErrorMsg, dataUserLocalStorage.token]);

  const updateStatus = async (status) => {
    await api.patch(
      `/seller/sale/${id}`,
      { status },
      { headers: { Authorization: dataUserLocalStorage.token } },
    ).then((response) => {
      console.log(response);

      setSale({ ...sale, status });
    });
  };

  const formatDate = (saleDate) => {
    const date = new Date(saleDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Navbar />
      <section>
        <h1>Detalhe do Pedido</h1>
      </section>
      <section>
        <span
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          <span>PEDIDO</span>
          <span>{`000${id}`}</span>
        </span>
        <span
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {formatDate(sale?.saleDate)}
        </span>
        <span
          data-testid={
            `seller_order_details__element-order-details-label-delivery-status${0}`
          }
        >
          { sale?.status }
        </span>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ !sale?.status?.includes('Pendente;') }
          onClick={ () => updateStatus('Preparando') }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ !sale?.status?.includes('Preparando') }
          onClick={ () => updateStatus('Em Trânsito') }
        >
          SAIU PARA ENTREGA
        </button>
      </section>
      <section>
        <TableDetails items={ items } />
      </section>
      <section>
        <span
          data-testid="seller_order_details__element-order-total-price"
        >
          { `Total: ${Number(sale?.totalPrice).toLocaleString(
            'pt-br',
            { style: 'currency', currency: 'BRL' },
          )}` }
        </span>
      </section>
    </>
  );
}

export default SellerOrderDetails;
