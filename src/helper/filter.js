export const excludeOutOfStock = (list) =>
  list.filter((product, index) => product.stock !== "Out of stock");

export const fastDelivery = (list) =>
  list.filter((product, index) => product.delivery === "Fast delivery");

export const excludeOutOfStockAndFastDelivery = (list) =>
  list.filter(
    (product) =>
      product.stock !== "Out of stock" && product.delivery === "Fast delivery"
  );
