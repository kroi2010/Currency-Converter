import React from 'react';
import { getFullName } from '../../helpers/currencyName';

const CurrencyInput = ({ currencyList, defaultCurrency }) => {
  const getOptions = () => {
    return currencyList.map((el, index) => {
      return (
        <option value={el.currency} key={index}>
          {getFullName(el.currency)}
        </option>
      );
    });
  };

  return (
    <div className="currency">
      <select className="currency__type">{getOptions()}</select>

      <input type="number" className="currency__input" />
    </div>
  );
};

export default CurrencyInput;
