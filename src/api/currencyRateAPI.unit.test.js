import { getCurrencyRates } from './currencyRateAPI';

describe('API Call', () => {
  it('returns currency list', async () => {
    const fetchCurrencyRates = await getCurrencyRates();
    const currencyList = fetchCurrencyRates.currencyList;

    expect(currencyList).toEqual(['USD', 'JPY', 'GBP', 'PLN', 'RUB']);
  });

  it('returns currency rates object', async () => {
    const fetchCurrencyRates = await getCurrencyRates();
    const currencyRates = fetchCurrencyRates.ratesObject;
    const expectedObject = {
      USD: '1.1785',
      JPY: '124.11',
      GBP: '0.90588',
      PLN: '4.5723',
      RUB: '91.4401',
    };

    expect(currencyRates).toMatchObject(expectedObject);
  });
});
