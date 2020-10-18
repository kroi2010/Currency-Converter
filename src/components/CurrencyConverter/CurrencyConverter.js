import React, { useEffect, useState } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';
import { useCurrencyChange, useLogger } from '../../hooks/customHooks';

const CurrencyConverter = () => {
  const [rateList, setRateList] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const firstCurrency = useCurrencyChange({
    name: 'USD',
    amount: 1,
  });
  const secondCurrency = useCurrencyChange({
    name: 'EUR',
    amount: 0,
  });

  useLogger(firstCurrency.value);
  useLogger(secondCurrency.value);

  useEffect(() => {
    getCurrencyRates().then((data) => {
      setRateList({ ...data.ratesObject, EUR: '1' });
      setCurrencyList([...data.currencyList, 'EUR']);
    });
  }, []);

  // initial calculations of euro amount once rate is obtained
  useEffect(() => {
    // if (Object.keys(rateList).length === 0) {
    //   return;
    // }
    // setSecondCurrency({
    //   ...secondCurrency,
    //   value: calcValue(firstCurrency, secondCurrency),
    // });
  }, [rateList]);

  const calcRate = (initialRate, againstRate) => {
    return againstRate / initialRate;
  };

  const calcValue = (from, to) => {
    const result =
      from.value * calcRate(rateList[from.name], rateList[to.name]);
    return result;
  };

  return (
    <div className="currency-converter">
      <CurrencyInput
        currencyList={currencyList}
        currencyValue={firstCurrency.value.amount}
        defaultCurrency={firstCurrency.value.name}
        againstCurrency={secondCurrency.value.name}
        rate={calcRate(
          rateList[firstCurrency.value.name],
          rateList[secondCurrency.value.name]
        )}
        onCurrencyChange={firstCurrency.onChange}
      />

      <CurrencyInput
        currencyList={currencyList}
        currencyValue={secondCurrency.value.amount}
        defaultCurrency={secondCurrency.value.name}
        againstCurrency={firstCurrency.value.name}
        rate={calcRate(
          rateList[secondCurrency.value.name],
          rateList[firstCurrency.value.name]
        )}
        onCurrencyChange={secondCurrency.onChange}
      />
    </div>
  );
};

export default CurrencyConverter;
