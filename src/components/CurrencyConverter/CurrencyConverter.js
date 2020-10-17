import React, { useEffect, useState } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';

const CurrencyConverter = () => {
  const [currencyList, setCurrencyList] = useState(null);

  useEffect(() => {
    getCurrencyRates();
  });

  return (
    <div className="currency-converter">
      {currencyList ? <CurrencyInput currencyList={currencyList} /> : null}

      {currencyList ? <CurrencyInput currencyList={currencyList} /> : null}
    </div>
  );
};

export default CurrencyConverter;
