import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';

const CurrencyConverter = () => {
  const [rateList, setRateList] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState({
    name: 'USD',
    value: 1,
  });
  const [secondCurrency, setSecondCurrency] = useState({
    name: 'EUR',
    value: 0,
  });
  const firstRateUpdate = useRef(true);

  useEffect(() => {
    getCurrencyRates().then((data) => {
      setRateList({ ...data.ratesObject, EUR: '1' });
      setCurrencyList([...data.currencyList, 'EUR']);
      console.log('>>> Fetched currency rates!');
    });
  }, []);

  useLayoutEffect(() => {
    // initial calculations of euro amount once rate is obtained
    if (firstRateUpdate.current) {
      firstRateUpdate.current = false;
      return;
    }
    setSecondCurrency({
      ...secondCurrency,
      value: calcValue(firstCurrency, secondCurrency),
    });
  }, [rateList]);

  const calcRate = (initialRate, againstRate) => {
    return againstRate / initialRate;
  };

  const calcValue = (from, to) => {
    debugger;
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
