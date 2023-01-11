import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logout from '../../../helpers/Logout';

function MyNavbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  return (
    <nav
      style={ { display: 'flex', justifyContent: 'space-between' } }
      className="bg-gradient-to-r from-[#87758f] to-[#85aab0] text-white p-2"
    >
      <div
        data-testid="customer_products__element-navbar-link-products"
        className="customer_products__element-navbar-link-products"
      >
        <Link to="/customer/products">Produtos</Link>
      </div>
      <div
        data-testid="customer_products__element-navbar-link-orders"
        className="customer_products__element-navbar-link-orders"
      >
        <Link to="/customer/orders">Meus Pedidos</Link>
      </div>
      <div
        data-testid="customer_products__element-navbar-user-full-name"
        className="customer_products__element-navbar-user-full-name"
      >
        <p style={ { margin: 0 } }>{ user ? user.name : 'Não Logado.' }</p>
      </div>
      <div
        data-testid="customer_products__element-navbar-link-logout"
        className="customer_products__element-navbar-link-logout"
      >
        <button type="button" onClick={ () => Logout(history) }>Sair</button>
      </div>
    </nav>
  );
}

export default MyNavbar;
