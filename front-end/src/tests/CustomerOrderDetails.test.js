import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../services/requests';
import localStorageMock from './mocks/localStorageMock';
import {
  exemploPatchResponse,
  resultSaleDetails,
  resultSaleDetailsStatusIntransit,
  customerUserLocalStorageMock,
} from './mocks/CustomerOrderDetailsMock';

const ROUTE_CUSTOMER_DETAILS = '/customer/orders/1';
const TESTID_BUTTON_DELIVERY = 'customer_order_details__button-delivery-check';

describe('teste pag CustomerOrderDetails', () => {
  beforeEach(() => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve({ data: resultSaleDetails }));

    localStorageMock();
    window.localStorage.setItem(
      'user',
      JSON.stringify(customerUserLocalStorageMock),
    );
  });

  test('se contém todos os elementos renderizados na pag', async () => {
    const { history, findByRole, findByTestId } = renderWithRouter(
      <App />,
    );
    history.push(ROUTE_CUSTOMER_DETAILS);

    const titlePag = await findByRole('heading', {
      name: /detalhe do pedido/i,
    });
    const requestId = await findByTestId(
      'customer_order_details__element-order-details-label-order-id',
    );
    const sellerName = await findByTestId(
      'customer_order_details__element-order-details-label-seller-name',
    );
    const data = await findByTestId(
      'customer_order_details__element-order-details-label-order-date',
    );
    const status = await findByTestId(
      'customer_order_details__element-order-details-label-delivery-status0',
    );
    const buttonDelivered = await findByTestId(
      TESTID_BUTTON_DELIVERY,
    );
    const tableItem = await findByRole('columnheader', { name: /item/i });
    const tableDescription = await findByRole('columnheader', {
      name: /descrição/i,
    });
    const tableQuantity = await findByRole('columnheader', {
      name: /quantidade/i,
    });
    const tablePriceUnit = await findByRole('columnheader', {
      name: /valor unitário/i,
    });
    const tablePriceSubTotal = await findByRole('columnheader', {
      name: /sub-total/i,
    });
    const priceTotal = await findByTestId(
      'customer_order_details__element-order-total-price',
    );

    expect(titlePag).toBeInTheDocument();
    expect(requestId).toBeInTheDocument();
    expect(sellerName).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(buttonDelivered).toBeInTheDocument();
    expect(tableItem).toBeInTheDocument();
    expect(tableDescription).toBeInTheDocument();
    expect(tableQuantity).toBeInTheDocument();
    expect(tablePriceUnit).toBeInTheDocument();
    expect(tablePriceSubTotal).toBeInTheDocument();
    expect(priceTotal).toBeInTheDocument();
  });

  test('se o botão está desabilitado com o status delivered', async () => {
    const { history, findByTestId } = renderWithRouter(
      <App />,
    );
    history.push(ROUTE_CUSTOMER_DETAILS);

    const buttonDelivered = await findByTestId(
      TESTID_BUTTON_DELIVERY,
    );

    expect(buttonDelivered).toBeDisabled();
  });

  test('se o botão está desabilitado com o status inTransit', async () => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(
        () => Promise.resolve({ data: resultSaleDetailsStatusIntransit }),
      );

    const { history, findByTestId } = renderWithRouter(
      <App />,
    );
    history.push(ROUTE_CUSTOMER_DETAILS);

    const buttonDelivered = await findByTestId(
      TESTID_BUTTON_DELIVERY,
    );

    expect(buttonDelivered).not.toBeDisabled();
  });

  test('se ao clicar no botão o status inTransit muda pra delivered', async () => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(
        () => Promise.resolve({ data: resultSaleDetailsStatusIntransit }),
      );
    jest
      .spyOn(api, 'patch')
      .mockImplementation(() => Promise.resolve(exemploPatchResponse));

    const { history, findByTestId } = renderWithRouter(
      <App />,
    );
    history.push(ROUTE_CUSTOMER_DETAILS);

    const buttonDelivered = await findByTestId(
      TESTID_BUTTON_DELIVERY,
    );

    expect(buttonDelivered).not.toBeDisabled();

    userEvent.click(buttonDelivered);

    await waitFor(() => expect(buttonDelivered).toBeDisabled());
  });
});
