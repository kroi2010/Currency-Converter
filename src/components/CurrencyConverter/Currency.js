import React from 'react';
import { getFullName } from '../../helpers/currencyName';

const CurrencyInput = (currencyList, defaultCurrency) => {
  return (
    <div className="currency">
      <select className="currency__type">
        {currencyList.map((currency) => {
          return (
            <option value={currency.name}>{getFullName(currency.name)}</option>
          );
        })}
      </select>

      <input type="number" className="currency__input" />
    </div>
  );
};

export default CurrencyInput;
