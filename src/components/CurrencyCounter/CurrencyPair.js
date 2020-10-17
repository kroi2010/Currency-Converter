import React, { useState } from 'react';
import CurrencyInput from './Currency';

const CurrencyPair = () => {
  const [rightCurrencyValue, setRightCurrencyValue] = useState();
  const [leftCurrencyValue, setLeftCurrencyValue] = useState();

  return (
    <>
      <CurrencyInput />

      <CurrencyInput />
    </>
  );
};

export default CurrencyPair;
