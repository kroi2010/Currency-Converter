import React, { useEffect, useState } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';

const CurrencyConverter = () => {
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    getCurrencyRates().then((data) => setCurrencyList(data));
  }, []);

  return (
    <div className="currency-converter">
      {currencyList.length > 0 ? (
        <CurrencyInput currencyList={currencyList} />
      ) : null}

      {currencyList.length > 0 ? (
        <CurrencyInput currencyList={currencyList} />
      ) : null}
    </div>
  );
};

export default CurrencyConverter;
