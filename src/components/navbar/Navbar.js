import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <p>Shopping</p>
        <div className={styles.elements}>
          <p>Wishlist</p>
          <p>Cart</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
