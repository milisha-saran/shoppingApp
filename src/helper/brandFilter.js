export const brandFilter = (list, brands) =>
  list.filter((product) =>
    brands.some((brand) => product.name.includes(brand))
  );
