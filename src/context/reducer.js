export const initialValue = {
  products: [],
  wishlist: [],
  cart: [],
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    default:
      return state;
  }
};
