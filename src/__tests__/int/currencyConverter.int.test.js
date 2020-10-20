import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import CurrencyConverter from '../../components/CurrencyConverter/CurrencyConverter';

describe('Currency converter', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      render(<CurrencyConverter />, container);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('changes input currency value when user selects different currency', () => {
    const select = screen.getAllByRole('combobox')[0];
    const symbol = screen.getAllByTestId('currency-input-symbol')[0];
    act(() => {
      userEvent.selectOptions(select, ['JPY']);
    });
    expect(symbol).toHaveTextContent('¥');
  });

  it('calculates new currency amount if user selects different currency', () => {
    const select = screen.getAllByRole('combobox')[0];
    const input = screen.getAllByRole('spinbutton')[1];
    expect(input.value).toBe('0.85');
    act(() => {
      userEvent.selectOptions(select, ['JPY']);
    });
    expect(input.value).toBe('0.01');
  });

  it('calculates new currency amount after input change', () => {
    const firstInput = screen.getAllByRole('spinbutton')[0];
    const secondInput = screen.getAllByRole('spinbutton')[1];
    expect(secondInput.value).toBe('0.85');
    act(() => {
      userEvent.type(firstInput, '2');
    });
    expect(secondInput.value).toBe('1.7');
  });

  it('prevents user from typing letters into currency input', () => {
    const input = screen.getAllByRole('spinbutton')[0];
    expect(input.value).toBe('1');
    act(() => {
      userEvent.type(input, 'Hello!');
    });
    expect(input.value).toBe('');
  });
});
