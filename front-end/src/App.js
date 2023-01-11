import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import SellerOrderDetails from './pages/SellerOrderDetails';
import Products from './pages/CustomerPath/Products';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route path="/customer/orders/:id" component={ CustomerOrderDetails } />
        <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </Provider>
    </Switch>
  );
}

export default App;
