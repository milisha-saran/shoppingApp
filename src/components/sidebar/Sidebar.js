import React, { useEffect } from "react";
import { brands } from "../../constants/brands";
import { useProduct } from "../../context/ProductProvider";
import { brandFilter } from "../../helper/brandFilter";
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
          modifiedProducts: sortHighToLow([...state.modifiedProducts]),
        },
      });
    }
    if (value === "LOW_TO_HIGH") {
      dispatch({
        type: "SORT_BY",
        payload: {
          sortBy: { lowtohigh: true, hightolow: false },
          modifiedProducts: sortLowToHigh([...state.modifiedProducts]),
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

  const filterBrands = (e) => {
    const value = e.target.value;
    dispatch({
      type: "FILTER_BRANDS",
      payload: state.brands.includes(value)
        ? state.brands.filter((ele) => ele !== value)
        : [...state.brands, value],
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

  useEffect(() => {
    if (state.brands.length !== 0)
      dispatch({
        type: "SET_PRODUCTS",
        payload: brandFilter([...state.products], state.brands),
      });
  }, [state.brands]);

  return (
    <div className={styles.sidebar}>
      <p className={styles.heading}>Filters</p>
      <div className={styles.filtering}>
        <div className={styles.subheading}>
          <i className="fa fa-sort"></i>
          <p>Sort By</p>
        </div>
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
        <div className={styles.subheading}>
          <i className="fa-solid fa-filter"></i>
          <p>Filter</p>
        </div>
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
        <div className={styles.subheading}>
          {" "}
          <i className="fa-solid fa-bars"></i>
          <p>Brands</p>
        </div>
        {brands.map((brand) => {
          return (
            <div className={styles.brand} key={brand.id}>
              <input
                type="checkbox"
                value={brand.name}
                checked={state.brands.includes(brand.name)}
                onChange={filterBrands}
              />
              <label>{brand.name}</label>
            </div>
          );
        })}
      </div>
      <button className={styles.clearfilter} onClick={clearFilters}>
        Clear All
      </button>
    </div>
  );
};

export default Sidebar;
