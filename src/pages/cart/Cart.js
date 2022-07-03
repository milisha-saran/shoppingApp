import React, { useState } from "react";
import styles from "./cart.module.css";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useProduct();
  const [quantity, setQuantity] = useState(1);

  const deleteFromCart = (_id) => {
    dispatch({
      type: "MODIFY_CART",
      payload: state.cart.filter((id) => _id !== id),
    });
  };

  const moveToWishlist = (_id) => {
    dispatch({
      type: "MODIFY_WISHLIST",
      payload: [...state.wishlist, _id],
    });
    deleteFromCart(_id);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
  };

  return (
    <Layout>
      <div className={styles.layout}>
        {state.products
          .filter((product) => state.cart.includes(product._id))
          .map(({ img, price, _id, name }) => {
            return (
              <div className={styles.card} key={_id}>
                <div>
                  <img
                    className={styles.productimage}
                    src={img}
                    alt="product"
                  />

                  <div>
                    <p className={styles.producttitle}>{name}</p>
                    <p>₹ {price}</p>
                  </div>
                </div>

                <div className={styles.cartactions}>
                  <div className={styles.quantity}>
                    <button onClick={decreaseQuantity}>-</button>
                    <p>Quantity : {quantity}</p>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    className={styles.addbutton}
                    onClick={() => moveToWishlist(_id)}
                  >
                    Move To Wishlist
                  </button>{" "}
                  <div className={styles.deletebutton}>
                    <i
                      className="fa-solid fa-trash fa-lg"
                      onClick={() => deleteFromCart(_id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Cart;
