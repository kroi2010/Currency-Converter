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
  // console.log(
  //   '>>> Updated currency ',
  //   defaultCurrency,
  //   currencyValue,
  //   currencyList
  // );

  return (
    <div className="currency">
      <p>
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
        name="value"
        value={currencyValue}
      />
    </div>
  );
};

export default CurrencyInput;
