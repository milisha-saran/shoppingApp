import React, { useState } from "react";
import styles from "./cart.module.css";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { priceCalculator } from "../../helper/priceCalculator";

const Cart = () => {
  const { state, dispatch } = useProduct();
  const [quantity, setQuantity] = useState(1);

  const cartList = state.products.filter((product) =>
    state.cart.includes(product._id)
  );

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
        <div>
          {cartList.map(({ img, price, _id, name, delivery }) => {
            return (
              <div className={styles.card} key={_id}>
                <div className={styles.product}>
                  <img
                    className={styles.productimage}
                    src={img}
                    alt="product"
                  />
                  <div>
                    <div className={styles.quantity}>
                      <button
                        className={styles.modifybutton}
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <p> Quantity : {quantity} </p>
                      <button
                        className={styles.modifybutton}
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.productinfo}>
                    {" "}
                    <p className={styles.producttitle}>{name}</p>
                    <p className={styles.productprice}>₹ {price}</p>
                    <p className={styles.productdelivery}>{delivery}</p>
                  </div>
                  <div className={styles.cartactions}>
                    {" "}
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
              </div>
            );
          })}
        </div>
        <div className={styles.paymentcard}>
          <p>Price Details</p>
          <p>Total price : {}</p>
          <p>Discount : {}</p>
          <p>Delivery Charges : {}</p>
          <p>Total Amount : {priceCalculator(cartList)}</p>
          <button>Pay Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
