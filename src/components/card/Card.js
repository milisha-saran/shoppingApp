import React from "react";
import styles from "./card.module.css";

const Card = () => {
  return (
    <div className={styles.card}>
      <div>
        <img
          className={styles.productimage}
          src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="banana"
        />

        <div className={styles.productinfo}>
          <p className={styles.producttitle}>Banana v69</p>
          <p>Rs. 420</p>
          <p>Out of stock</p>
          <p style={{ fontSize: 15 }}>Fast Delivery</p>
        </div>
      </div>
      <button className={styles.addbutton}>Add to Cart</button>
    </div>
  );
};

export default Card;
