export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: `<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
        <gesmes:subject>Reference rates</gesmes:subject>
        <gesmes:Sender>
        <gesmes:name>European Central Bank</gesmes:name>
        </gesmes:Sender>
        <Cube>
        <Cube time="2020-10-19">
        <Cube currency="USD" rate="1.1785"/>
        <Cube currency="JPY" rate="124.11"/>
        <Cube currency="GBP" rate="0.90588"/>
        <Cube currency="PLN" rate="4.5723"/>
        <Cube currency="RUB" rate="91.4401"/>
        </Cube>
        </Cube>
        </gesmes:Envelope>`,
    })
  ),
};
