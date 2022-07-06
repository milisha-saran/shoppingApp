export const initialValue = {
  userid: "",
  products: [],
  modifiedProducts: [],
  wishlist: [],
  cart: [],
  allCategory: [],
  selectedCategory: [],
  sortBy: { lowtohigh: false, hightolow: false },
  filterBy: [],
  brands: [],
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SET_USERID":
      return { ...state, userid: action.payload };
    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };
    case "FETCH_CATEGORY":
      return { ...state, allCategory: action.payload };
    case "SET_PRODUCTS":
      return { ...state, modifiedProducts: action.payload };
    case "SORT_BY":
      return { ...state, ...action.payload };
    case "FILTER_BY":
      return { ...state, filterBy: action.payload };
    case "FILTER_BRANDS":
      return { ...state, brands: action.payload };
    case "MODIFY_WISHLIST":
      return { ...state, wishlist: action.payload };
    case "MODIFY_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_ALL":
      return {
        ...state,
        modifiedProducts: state.products,
        sortBy: { lowtohigh: false, hightolow: false },
        filterBy: [],
        brands: [],
      };

    default:
      return state;
  }
};
