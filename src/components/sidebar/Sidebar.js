import React, { useEffect } from "react";
import { useProduct } from "../../context/ProductProvider";
import {
  excludeOutOfStock,
  excludeOutOfStockAndFastDelivery,
  fastDelivery,
} from "../../helper/filter";
import { sortHighToLow, sortLowToHigh } from "../../helper/sort";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const { state, dispatch } = useProduct();

  const sortProducts = (e) => {
    const value = e.target.value;
    if (value === "HIGH_TO_LOW") {
      dispatch({
        type: "SORT_BY",
        payload: {
          sortBy: { lowtohigh: false, hightolow: true },
          modifiedProducts: sortHighToLow([...state.products]),
        },
      });
    }
    if (value === "LOW_TO_HIGH") {
      dispatch({
        type: "SORT_BY",
        payload: {
          sortBy: { lowtohigh: true, hightolow: false },
          modifiedProducts: sortLowToHigh([...state.products]),
        },
      });
    }
  };

  const filterProducts = (e) => {
    const value = e.target.value;
    dispatch({
      type: "FILTER_BY",
      payload: state.filterBy.includes(value)
        ? state.filterBy.filter((ele) => ele !== value)
        : [...state.filterBy, value],
    });
  };

  const clearFilters = () => {
    dispatch({
      type: "CLEAR_ALL",
    });
  };

  useEffect(() => {
    const isOutOfStock = state.filterBy.includes("OUT_OF_STOCK");
    const isFastDelivery = state.filterBy.includes("FAST_DELIVERY");

    switch (true) {
      case isOutOfStock && isFastDelivery:
        return dispatch({
          type: "SET_PRODUCTS",
          payload: excludeOutOfStockAndFastDelivery([...state.products]),
        });
      case isOutOfStock && !isFastDelivery:
        return dispatch({
          type: "SET_PRODUCTS",
          payload: excludeOutOfStock([...state.products]),
        });
      case !isOutOfStock && isFastDelivery:
        return dispatch({
          type: "SET_PRODUCTS",
          payload: fastDelivery([...state.products]),
        });
      case !isOutOfStock && !isFastDelivery:
        return dispatch({
          type: "SET_PRODUCTS",
          payload: state.products,
        });
    }
  }, [state.filterBy]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sorting}>
        Sort By
        <span>
          <input
            type="radio"
            value="HIGH_TO_LOW"
            checked={state.sortBy.hightolow}
            onClick={sortProducts}
          />
          <label>Price - High to Low</label>
        </span>
        <span>
          <input
            type="radio"
            value="LOW_TO_HIGH"
            checked={state.sortBy.lowtohigh}
            onClick={sortProducts}
          />
          <label>Price - Low to High</label>
        </span>
      </div>
      <div className={styles.filtering}>
        Filter
        <span>
          <input
            type="checkbox"
            value="OUT_OF_STOCK"
            checked={state.filterBy.includes("OUT_OF_STOCK")}
            onChange={filterProducts}
          />
          <label>Exclude out of stock</label>
        </span>
        <span>
          <input
            type="checkbox"
            value="FAST_DELIVERY"
            checked={state.filterBy.includes("FAST_DELIVERY")}
            onChange={filterProducts}
          />
          <label>Fast Delivery</label>
        </span>
      </div>
      <div className={styles.brands}>
        Brands
        {state.allCategory.map((category, index) => {
          return (
            <div className={styles.brand} key={index}>
              <input type="checkbox" />
              <label>{category}</label>
            </div>
          );
        })}
      </div>
      <button onClick={clearFilters}>Clear All</button>
    </div>
  );
};

export default Sidebar;
