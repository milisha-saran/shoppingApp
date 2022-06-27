export const sortHighToLow = (list) =>
  list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
export const sortLowToHigh = (list) =>
  list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
