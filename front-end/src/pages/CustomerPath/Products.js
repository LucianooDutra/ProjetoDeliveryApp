import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthorizationCheck from '../../helpers/AuthorizationHelper';
import { requestProductsList } from '../../services/requests';
import CartView from './components/CartView';
import MyNavbar from './components/Navbar';
import ProductDisplay from './components/ProductDisplay';

function Products() {
  const history = useHistory();

  AuthorizationCheck()
    .then((auth) => (auth.code ? history.push('/')
      : auth.role !== 'customer' && history.push('/')));

  const [loading, setLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState(0);
  useEffect(() => {
    const asyncFunc = async () => {
      const { token } = await JSON.parse(localStorage.getItem('user'));
      localStorage.setItem(
        'products',
        JSON.stringify(await requestProductsList('products', token)),
      );
      return setLoading(false);
    };
    asyncFunc();
  }, []);

  const productsList = JSON.parse(localStorage.getItem('products'));

  return (
    <>
      <MyNavbar />
      <div className="flex flex-col items-center gap-4 mx-6">
        <h1 className="flex-1 my-8 text-xl text-gray-700 font-semibold">Products</h1>
        <div className="flex gap-4 flex-wrap">
          { loading ? 'Loading'
            : productsList?.map(
              (product, index) => (
                <ProductDisplay
                  key={ index }
                  product={ product }
                  setShoppingCart={ setShoppingCart }
                />),
            )}
        </div>
      </div>
      <CartView
        cart={ shoppingCart }
      />
    </>
  );
}

export default Products;
