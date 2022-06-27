import React, { useEffect } from "react";
import { useProduct } from "../../context/ProductProvider";
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
          modifiedProducts: sortLowToHigh([[...state.products]]),
        },
      });
    }
  };

  const clearFilters = () => {
    dispatch({
      type: "CLEAR_ALL",
    });
  };

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
          <input type="checkbox" />
          <label>Include out of stock</label>
        </span>
        <span>
          <input type="checkbox" />
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
