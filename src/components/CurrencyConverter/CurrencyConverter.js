import React, { useEffect, useState } from 'react';
import CurrencyInput from './Currency';
import { getCurrencyRates } from '../../api/currencyRateAPI';
import { useCurrencyChange } from '../../hooks/customHooks';

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
      calcValue(
        firstCurrency.value.amount,
        firstCurrency.value.name,
        secondCurrency.value.name
      )
    );
  }, [rateList]);

  const currencyChange = (currencyChanged, currencyToChange) => (event) => {
    currencyChanged.onChange(event);

    currencyToChange.update(
      'amount',
      event.target.name === 'amount'
        ? calcValue(
            parseFloat(event.target.value),
            currencyChanged.value.name,
            currencyToChange.value.name
          )
        : calcValue(
            currencyChanged.value.amount,
            event.target.value,
            currencyToChange.value.name
          )
    );
  };

  const calcRate = (initialRate, againstRate) => againstRate / initialRate;

  const calcValue = (fromAmount, fromCurrency, toCurrency) =>
    fromAmount * calcRate(rateList[fromCurrency], rateList[toCurrency]);

  return (
    <>
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
          onCurrencyChange={currencyChange(firstCurrency, secondCurrency)}
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
          onCurrencyChange={currencyChange(secondCurrency, firstCurrency)}
        />
      </div>
      <p className="disclaimer">
        All currencies are displayed rounded to two digits after comma.
      </p>
    </>
  );
};

export default CurrencyConverter;
