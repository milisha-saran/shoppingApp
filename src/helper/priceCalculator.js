export const priceCalculator = (list) => {
  const prices = list.map(({ item, quantity }) => item.price * quantity);
  let total = 0;

  const amount = prices.reduce((sum, price) => sum + price, 0);

  const discount = 0.1 * amount;

  const value = list.some(({ item }) => item.delivery === "Fast delivery");

  const delivery = value ? 100 : 0;

  total = amount + delivery - discount;

  return { total, amount, discount, delivery };
};
