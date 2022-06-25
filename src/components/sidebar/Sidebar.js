import React from "react";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sorting}>
        Sort By
        <span>
          <input type="radio" />
          <label>Price - High to Low</label>
        </span>
        <span>
          <input type="radio" />
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
    </div>
  );
};

export default Sidebar;
