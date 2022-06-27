export const initialValue = {
  products: [],
  modifiedProducts: [],
  wishlist: [],
  cart: [],
  allCategory: [],
  selectedCategory: [],
  sortBy: { lowtohigh: false, hightolow: false },
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };
    case "FETCH_CATEGORY":
      return { ...state, allCategory: action.payload };
    case "SORT_BY":
      return { ...state, ...action.payload };
    case "SET_PRODUCTS":
      return { ...state, modifiedProducts: action.payload };
    case "CLEAR_ALL":
      return {
        ...state,
        modifiedProducts: state.products,
        sortBy: { lowtohigh: false, hightolow: false },
      };

    default:
      return state;
  }
};
