import React, { useEffect, useState } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';
import {
  useCurrencyChange,
  useLogger,
  useCurrencyBind,
} from '../../hooks/customHooks';
import { calcValue, calcRate } from '../../helpers/rateCalculator';

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

  useCurrencyBind(firstCurrency, secondCurrency, rateList);
  useCurrencyBind(secondCurrency, firstCurrency, rateList);

  // useEffect(() => {
  //   if (Object.keys(rateList).length === 0) return;

  //   secondCurrency.update(
  //     'amount',
  //     calcValue(firstCurrency.value, secondCurrency.value)
  //   );
  // }, [firstCurrency.value.name, firstCurrency.value.amount]);

  // useEffect(() => {
  //   if (Object.keys(rateList).length === 0) return;

  //   firstCurrency.update(
  //     'amount',
  //     calcValue(secondCurrency.value, firstCurrency.value)
  //   );
  // }, [secondCurrency.value.name, secondCurrency.value.amount]);

  useEffect(() => {
    getCurrencyRates().then((data) => {
      setRateList({ ...data.ratesObject, EUR: '1' });
      setCurrencyList([...data.currencyList, 'EUR']);
    });
  }, []);

  // initial calculations of euro amount once rate is obtained
  useEffect(() => {
    if (Object.keys(rateList).length === 0) {
      return;
    }
    secondCurrency.update(
      'amount',
      calcValue(firstCurrency.value, secondCurrency.value, rateList)
    );
  }, [rateList]);

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
