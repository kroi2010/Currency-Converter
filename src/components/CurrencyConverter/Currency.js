import React from 'react';

const CurrencyInput = () => (
  <div className="currency">
    <select className="currency__type" searchable>
      <option>United States Dollar</option>

      <option>Euro</option>

      <option>Great Britain Pound</option>
    </select>

    <input type="number" className="currency__input" />
  </div>
);

export default CurrencyInput;
