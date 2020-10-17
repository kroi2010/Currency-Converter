import React, { useState } from 'react';
import CurrencyInput from './Currency';

const CurrencyConverter = () => {
  const [rightCurrencyValue, setRightCurrencyValue] = useState();
  const [leftCurrencyValue, setLeftCurrencyValue] = useState();

  return (
    <div className="currency-converter">
      <CurrencyInput />

      <CurrencyInput />
    </div>
  );
};

export default CurrencyConverter;
