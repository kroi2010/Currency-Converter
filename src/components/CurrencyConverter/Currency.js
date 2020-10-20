import React from 'react';
import { getFullName } from '../../helpers/currencyName';
import { getSymbol } from '../../helpers/currencySymbol';

const Currency = ({
  currencyList,
  currencyValue,
  defaultCurrency,
  againstCurrency,
  rate,
  onCurrencyChange,
}) => {
  return (
    <div className="currency">
      <p className="currency__rate" data-testid="currency-rate">
        1 {defaultCurrency} = {`${rate} ${againstCurrency}`}
      </p>
      <select
        className="currency__type"
        value={defaultCurrency}
        name="name"
        onChange={onCurrencyChange}
      >
        {currencyList.map((currency, index) => (
          <option value={currency} key={index}>
            {getFullName(currency)}
          </option>
        ))}
      </select>

      <div className="currency__input-wrapper">
        <span
          className="currency__input-symbol"
          data-testid="currency-input-symbol"
        >
          {getSymbol(defaultCurrency)}
        </span>

        <input
          type="number"
          className="currency__input"
          onChange={onCurrencyChange}
          name="amount"
          value={Math.round(currencyValue * 100) / 100}
        />
      </div>
    </div>
  );
};

export default Currency;
