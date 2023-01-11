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
  resultSaleDetailsStatusPending,
  resultSaleDetailsStatusPreparing,
  customerUserLocalStorageMock,
} from './mocks/SellerOrderDetailsMock';

const ROUTE_SELLER_DETAILS = '/seller/orders/1';
const TESTID_BUTTON_PREPARING = 'seller_order_details__button-preparing-check';
const TESTID_BUTTON_INTRANSIT = 'seller_order_details__button-dispatch-check';

describe('teste pag /seller/orders/:id', () => {
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
    const { history, findByRole, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_DETAILS);

    const titlePag = await findByRole('heading', {
      name: /detalhe do pedido/i,
    });
    const requestId = await findByTestId(
      'seller_order_details__element-order-details-label-order-id',
    );
    const data = await findByTestId(
      'seller_order_details__element-order-details-label-order-date',
    );
    const status = await findByTestId(
      'seller_order_details__element-order-details-label-delivery-status0',
    );
    const buttonPreparing = await findByTestId(
      TESTID_BUTTON_PREPARING,
    );
    const buttonInTransit = await findByTestId(
      TESTID_BUTTON_PREPARING,
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
      'seller_order_details__element-order-total-price',
    );

    expect(titlePag).toBeInTheDocument();
    expect(requestId).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(buttonPreparing).toBeInTheDocument();
    expect(buttonInTransit).toBeInTheDocument();
    expect(tableItem).toBeInTheDocument();
    expect(tableDescription).toBeInTheDocument();
    expect(tableQuantity).toBeInTheDocument();
    expect(tablePriceUnit).toBeInTheDocument();
    expect(tablePriceSubTotal).toBeInTheDocument();
    expect(priceTotal).toBeInTheDocument();
  });

  test(`se com o status delivered, os botões 
  de "preparar pedido" e "saiu para entrega" estão desabilitados`, async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_DETAILS);

    const buttonPreparing = await findByTestId(
      TESTID_BUTTON_PREPARING,
    );
    const buttonInTransit = await findByTestId(
      TESTID_BUTTON_INTRANSIT,
    );

    expect(buttonPreparing).toBeDisabled();
    expect(buttonInTransit).toBeDisabled();
  });

  test(`se com o status pending, os botões de "preparar pedido" está
  habilitado e o "saiu para entrega" está desabilitado`, async () => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(
        () => Promise.resolve({ data: resultSaleDetailsStatusPending }),
      );

    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_DETAILS);

    const buttonPreparing = await findByTestId(
      TESTID_BUTTON_PREPARING,
    );
    const buttonInTransit = await findByTestId(
      TESTID_BUTTON_INTRANSIT,
    );

    expect(buttonPreparing).not.toBeDisabled();
    expect(buttonInTransit).toBeDisabled();
  });

  test(`se com o status preparing, os botões de "preparar pedido" 
  está desabilitado e o "saiu para entrega" está habilitado`, async () => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(
        () => Promise.resolve({ data: resultSaleDetailsStatusPreparing }),
      );

    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_DETAILS);

    const buttonPreparing = await findByTestId(
      TESTID_BUTTON_PREPARING,
    );
    const buttonInTransit = await findByTestId(
      TESTID_BUTTON_INTRANSIT,
    );

    expect(buttonPreparing).toBeDisabled();
    expect(buttonInTransit).not.toBeDisabled();
  });

  test(`se o status estiver pending o botão "preparar pedido" estará 
  habilitado e após clicar ficará desabilitado`, async () => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(
        () => Promise.resolve({ data: resultSaleDetailsStatusPending }),
      );
    jest
      .spyOn(api, 'patch')
      .mockImplementation(() => Promise.resolve(exemploPatchResponse));

    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_DETAILS);

    const buttonPreparing = await findByTestId(
      TESTID_BUTTON_PREPARING,
    );
    const buttonInTransit = await findByTestId(
      TESTID_BUTTON_INTRANSIT,
    );

    expect(buttonPreparing).not.toBeDisabled();
    expect(buttonInTransit).toBeDisabled();

    userEvent.click(buttonPreparing);

    await waitFor(() => expect(buttonPreparing).toBeDisabled());
    await waitFor(() => expect(buttonInTransit).not.toBeDisabled());
  });

  test(`se o status estiver preparing o botão "saiu para entrega" 
  estará habilitado e após clicar ficará desabilitado`, async () => {
    jest
      .spyOn(api, 'get')
      .mockImplementation(
        () => Promise.resolve({ data: resultSaleDetailsStatusPreparing }),
      );
    jest
      .spyOn(api, 'patch')
      .mockImplementation(() => Promise.resolve(exemploPatchResponse));

    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_DETAILS);

    const buttonPreparing = await findByTestId(
      TESTID_BUTTON_PREPARING,
    );
    const buttonInTransit = await findByTestId(
      TESTID_BUTTON_INTRANSIT,
    );

    expect(buttonPreparing).toBeDisabled();
    expect(buttonInTransit).not.toBeDisabled();

    userEvent.click(buttonInTransit);

    await waitFor(() => expect(buttonPreparing).toBeDisabled());
    await waitFor(() => expect(buttonInTransit).toBeDisabled());
  });
});
