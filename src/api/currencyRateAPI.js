import axios from 'axios';

const URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

export const getCurrencyRates = async () => {
  const textData = await fetch();
  const parsedData = parseData(textData);

  const currencyRatesList = parsedData.map((node) => {
    return {
      currency: node.getAttribute('currency'),
      rate: node.getAttribute('rate'),
    };
  });

  const ratesObject = currencyRatesList.reduce(
    (a, b) => ((a[b.currency] = b.rate), a),
    {}
  );
  const currencyList = currencyRatesList.map((obj) => obj.currency);

  return { ratesObject, currencyList };
};

const parseData = (data) => {
  const parser = new DOMParser();
  const xmlData = parser.parseFromString(data, 'text/xml');
  const parsedData = [...xmlData.querySelectorAll('Cube[currency]')];
  return parsedData;
};

const fetch = async () => {
  try {
    const { data: response } = await axios.get(proxyURL + URL);
    return response;
  } catch (error) {
    console.error('Could not fetch from ' + URL);
  }
};
