import { useEffect, useState, useRef } from 'react';

export const useLogger = (value) => {
  useEffect(() => {
    console.log('Value changed: ', value);
  }, [value]);
};

export const useCurrencyChange = (initialValue) => {
  const [value, setValue] = useState(initialValue);

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

  return { value, onChange, update };
};
