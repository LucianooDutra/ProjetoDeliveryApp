import React, { useState } from 'react';
import PropTypes from 'prop-types';

const invalidIndex = -1;

function ProductDisplay({ product, setShoppingCart }) {
  const { name, id, price } = product;
  const [productQuantity, setProductQuantity] = useState(0);

  const addItem = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const ShoppingCartLocalStore = JSON.parse(localStorage.getItem(user.email));
    if (!ShoppingCartLocalStore) {
      setShoppingCart(
        [{ name, id, quantity: 1, price }],
      );
      setProductQuantity(productQuantity + 1);
      return localStorage.setItem(
        user.email,
        JSON.stringify(
          [{ name, id, quantity: 1, price }],
        ),
      );
    }

    const productIndex = ShoppingCartLocalStore
      .findIndex((prod) => prod.id === id);

    if (productIndex === invalidIndex) {
      setShoppingCart([...ShoppingCartLocalStore,
        { name, id, quantity: 1, price }]);
      setProductQuantity(productQuantity + 1);
      return localStorage.setItem(
        user.email,
        JSON.stringify(
          [...ShoppingCartLocalStore,
            { name, id, quantity: 1, price }],
        ),
      );
    }

    ShoppingCartLocalStore[productIndex].quantity += 1;
    setProductQuantity(productQuantity + 1);
    setShoppingCart(ShoppingCartLocalStore);

    return localStorage
      .setItem(user.email, JSON.stringify(ShoppingCartLocalStore));
  };

  const removeItem = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const ShoppingCartLocalStore = JSON
      .parse(localStorage.getItem(user.email));

    if (!ShoppingCartLocalStore) {
      return null;
    }

    const productIndex = ShoppingCartLocalStore
      .findIndex((prod) => prod.id === product.id);

    if (productIndex === invalidIndex) {
      return null;
    }

    if (ShoppingCartLocalStore[productIndex].quantity === 0) {
      return null;
    }

    ShoppingCartLocalStore[productIndex].quantity -= 1;
    setProductQuantity(productQuantity - 1);

    setShoppingCart(ShoppingCartLocalStore);

    return localStorage.setItem(user.email, JSON.stringify(ShoppingCartLocalStore));
  };

  const handleQuantityInput = (value) => {
    setProductQuantity(Number(value));

    const user = JSON.parse(localStorage.getItem('user'));
    const ShoppingCartLocalStore = JSON.parse(localStorage.getItem(user.email));
    if (!ShoppingCartLocalStore) {
      setShoppingCart(
        [{ name, id, quantity: Number(value), price }],
      );
      return localStorage
        .setItem(
          user.email,
          JSON.stringify([{
            name,
            id,
            quantity: Number(value),
            price,
          }]),
        );
    }

    const productIndex = ShoppingCartLocalStore
      .findIndex((prod) => prod.id === product.id);
    if (productIndex === invalidIndex) {
      setShoppingCart([...ShoppingCartLocalStore,
        { name, id, quantity: Number(value), price }]);
      return localStorage
        .setItem(
          user.email,
          JSON.stringify(
            [...ShoppingCartLocalStore,
              {
                name,
                id,
                quantity: Number(value),
                price,
              }],
          ),
        );
    }

    ShoppingCartLocalStore[productIndex]
      .quantity = Number(value);
    setShoppingCart(ShoppingCartLocalStore);
    return localStorage
      .setItem(user.email, JSON.stringify(ShoppingCartLocalStore));
  };

  const handlePreviousDefaultValue = async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    const ShoppingCartLocalStore = JSON.parse(localStorage.getItem(user.email));
    if (!ShoppingCartLocalStore) return setProductQuantity(0);
    const productIndex = await ShoppingCartLocalStore
      .findIndex((prod) => prod.id === product.id);
    if (productIndex === invalidIndex) return setProductQuantity(0);
    return setProductQuantity(ShoppingCartLocalStore[productIndex].quantity);
  };
  useState(() => {
    handlePreviousDefaultValue();
  });

  return (
  // <div className="w-screen flex flex-wrap">
    <div className="flex flex-col py-3 items-center border-2 border-gray-400 gap-4 rounded-lg max-w-[200px]">
      <div className="mt-3">
        <img
          className="max-w-[76px] max-h-[76px]"
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          alt={ product.name }
          src={ product.urlImage }
        />

      </div>
      <p
        className="text-center"
        data-testid={ `customer_products__element-card-title-${product.id}` }
        // className="w-12"
      >
        { product.name }
      </p>
      <p
        data-testid={ `customer_products__element-card-price-${product.id}` }
        className="customer_products__element-card-price"
      >
        R$
        {product.price?.replace(/\./, ',')}
      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        // className="w-1/2"
        type="button"
        onClick={ () => removeItem() }
      >
        -
      </button>
      <input
        type="text"
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        className="w-full text-center outline-none"
        value={ productQuantity }
        onChange={ (e) => handleQuantityInput(e.target.value) }
      />
      <button
        type="button"
        onClick={ () => addItem() }
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        // className="w-1/2"
      >
        +
      </button>
    </div>
    // </div>
  );
}

ProductDisplay.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  setShoppingCart: PropTypes.func.isRequired,
};

export default ProductDisplay;
