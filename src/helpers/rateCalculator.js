export const calcRate = (initialRate, againstRate) => {
  return againstRate / initialRate;
};

export const calcValue = (from, to, rateList) => {
  return from.amount * calcRate(rateList[from.name], rateList[to.name]);
};
