import React from 'react';

const CurrencyInput = () => (
  <div class="currency">
    <select name="currency__type" searchable>
      <option>United States Dollar</option>

      <option>Euro</option>

      <option>Great Britain Pound</option>
    </select>

    <input type="number" class="currency__input" />
  </div>
);

export default CurrencyInput;
