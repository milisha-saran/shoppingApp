import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./wishlist.module.css";
import { textConverter } from "../../helper/textConverter";

import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";

const Wishlist = () => {
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  const deleteFromWishlist = (_id) => {
    dispatch({
      type: "DELETE_FROM_WISHLIST",
      payload: state.wishlist.filter((id) => _id !== id),
    });
  };

  const addToCart = (id) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: state.cart.includes(id)
        ? state.cart.filter((ele) => ele !== id)
        : [...state.cart, id],
    });
  };

  return (
    <Layout>
      <div className={styles.layout}>
        {state.products
          .filter((product) => state.wishlist.includes(product._id))
          .map(({ img, price, _id, name }) => {
            return (
              <div className={styles.card}>
                <div>
                  <div className={styles.deletebutton}>
                    <i
                      className="fa-solid fa-trash fa-lg"
                      onClick={() => deleteFromWishlist(_id)}
                    ></i>
                  </div>
                  <img
                    className={styles.productimage}
                    src={img}
                    alt="product"
                  />

                  <div>
                    <p className={styles.producttitle}>{textConverter(name)}</p>
                    <p>₹ {price}</p>
                  </div>
                </div>
                {state.cart.includes(_id) ? (
                  <button
                    className={styles.addbutton}
                    onClick={() => navigate("/cart")}
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    className={styles.addbutton}
                    onClick={() => addToCart(_id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Wishlist;
