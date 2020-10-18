import { useEffect, useState } from 'react';

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
      [event.target.name]: event.target.value,
    });
  };
  return { value, onChange };
};
