import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductProvider";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("rtoken");
    dispatch({ type: "REVERT" });

    navigate("/login");
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <p className={styles.element} onClick={() => navigate("/")}>
          8Gadget
        </p>
        <div className={styles.elements}>
          <div className={styles.element}>
            {state.wishlist.length !== 0 ? (
              <i
                className="fa-solid fa-heart fa-lg"
                onClick={() => navigate("/wishlist")}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart fa-lg"
                onClick={() => navigate("/wishlist")}
              ></i>
            )}
          </div>
          <div className={styles.element}>
            {state.cart.length !== 0 ? (
              <i
                className="fa-solid fa-dolly"
                onClick={() => navigate("/cart")}
              ></i>
            ) : (
              <i
                className="fa-solid fa-boxes-packing"
                onClick={() => navigate("/cart")}
              ></i>
            )}
          </div>
          {window.localStorage.getItem("rtoken") ? (
            <div className={styles.element} onClick={logout}>
              Log Out
            </div>
          ) : (
            <div className={styles.element} onClick={logout}>
              Log In
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
