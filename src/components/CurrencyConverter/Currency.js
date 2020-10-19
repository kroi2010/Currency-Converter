import React from 'react';
import { getFullName } from '../../helpers/currencyName';

const CurrencyInput = ({
  currencyList,
  currencyValue,
  defaultCurrency,
  againstCurrency,
  rate,
  onCurrencyChange,
}) => {
  return (
    <div className="currency">
      <p className="currency__rate">
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

      <input
        type="number"
        className="currency__input"
        onChange={onCurrencyChange}
        name="amount"
        value={currencyValue}
      />
    </div>
  );
};

export default CurrencyInput;
