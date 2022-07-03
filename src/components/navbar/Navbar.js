import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className={styles.navbar}>
        <p className={styles.element} onClick={() => navigate("/")}>
          Shopping
        </p>
        <div className={styles.elements}>
          <p className={styles.element} onClick={() => navigate("/wishlist")}>
            Wishlist
          </p>
          <p className={styles.element} onClick={() => navigate("/cart")}>
            Cart
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
