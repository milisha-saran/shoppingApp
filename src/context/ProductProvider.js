import { createContext, useContext, useReducer } from "react";
import { initialValue, reducerFunc } from "./Reducer";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(initialValue, reducerFunc);

  return <ProductContext value={products}>{children}</ProductContext>;
};

export const useProduct = () => {
  return useContext(ProductContext);
};
