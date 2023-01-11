import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../../context/Provider';

const renderWithRouterProvider = (component, {
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
} = {}) => ({
  ...render(
    <Provider>
      <Router history={ history }>
        {component}
      </Router>
      ,
    </Provider>,
  ),
  history,
});
export default renderWithRouterProvider;
