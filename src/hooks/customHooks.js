import { useEffect, useState, useRef } from 'react';
import { calcValue } from '../helpers/rateCalculator';

export const useLogger = (value) => {
  useEffect(() => {
    console.log('Value changed: ', value);
  }, [value]);
};

export const useCurrencyBind = (
  currencyChanged,
  currencyToUpdate,
  rateList
) => {
  useEffect(() => {
    if (Object.keys(rateList).length === 0) return;

    currencyToUpdate.update(
      'amount',
      calcValue(currencyChanged.value, currencyToUpdate.value, rateList)
    );
  }, [currencyChanged.value.name, currencyChanged.value.amount]);
};

export const useCurrencyChange = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const initialRender = useRef(true);

  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:
        event.target.name === 'amount'
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };

  const update = (key, newValue) => {
    setValue({
      ...value,
      [key]: newValue,
    });
  };

  return { value, onChange, update, initialRender };
};
