import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';

const CurrencyConverter = () => {
  const [rateList, setRateList] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState({
    name: 'USD',
  });
  const [secondCurrency, setSecondCurrency] = useState({
    name: 'EUR',
  });
  const firstRateUpdate = useRef(true);

  useEffect(() => {
    getCurrencyRates().then((data) => {
      setRateList({ ...data.ratesObject, EUR: '1' });
      setCurrencyList([...data.currencyList, 'EUR']);
    });
  }, []);

  const calcRate = (initialRate, againstRate) => {
    return againstRate / initialRate;
  };

  const calcValue = (from, to) => {
    const result =
      from.value * calcRate(rateList[from.name], rateList[to.name]);
    return result;
  };

  const changeFirstCurrency = (event) => {
    setFirstCurrency({
      ...firstCurrency,
      [event.target.name]: event.target.value,
    });
  };

  const changeSecondCurrency = (event) => {
    setSecondCurrency({
      ...secondCurrency,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="currency-converter">
      <CurrencyInput
        currencyList={currencyList}
        currencyValue={firstCurrency.value}
        defaultCurrency={firstCurrency.name}
        againstCurrency={secondCurrency.name}
        rate={calcRate(
          rateList[firstCurrency.name],
          rateList[secondCurrency.name]
        )}
        onCurrencyChange={changeFirstCurrency}
      />

      <CurrencyInput
        currencyList={currencyList}
        currencyValue={secondCurrency.value}
        defaultCurrency={secondCurrency.name}
        againstCurrency={firstCurrency.name}
        rate={calcRate(
          rateList[secondCurrency.name],
          rateList[firstCurrency.name]
        )}
        onCurrencyChange={changeSecondCurrency}
      />
    </div>
  );
};

export default CurrencyConverter;
