import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Currency from './Currency';

describe('Currency box', () => {
  let container = null;
  const onChange = jest.fn();

  const props = {
    currencyList: ['USD', 'JPY', 'GBP', 'PLN', 'RUB'],
    currencyValue: '1',
    defaultCurrency: 'USD',
    againstCurrency: 'JPY',
    rate: '105.31183708103521',
    onCurrencyChange: onChange,
  };

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      render(
        <Currency
          currencyList={props.currencyList}
          currencyValue={props.currencyValue}
          defaultCurrency={props.defaultCurrency}
          againstCurrency={props.againstCurrency}
          rate={props.rate}
          onCurrencyChange={props.onCurrencyChange}
        />,
        container
      );
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders currency rate ratio correctly', () => {
    expect(screen.getByTestId('currency-rate')).toHaveTextContent(
      `1 ${props.defaultCurrency} = ${props.rate} ${props.againstCurrency}`
    );
  });

  it('renders correct currency symbol for input', () => {
    expect(screen.getByTestId('currency-input-symbol')).toHaveTextContent('$');
  });

  it('renders correct default currency value', () => {
    expect(screen.getByTestId('currency-input').value).toBe(
      props.currencyValue
    );
  });
});
