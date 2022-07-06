export const priceCalculator = (list) => {
  const prices = list.map((product) => product.price);
  let amount = 0;
  let total = prices.reduce((total, price) => total + price);

  if (list.delivery === "Fast delivery") amount = total + 100;
  return amount;
};
