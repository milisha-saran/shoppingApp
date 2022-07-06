import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import { API } from "../../server";
import styles from "./card.module.css";

const Card = ({ product }) => {
  const [isLoading, setLoading] = useState(false);
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  const { delivery, img, name, price, stock, _id } = product;

  const addToCart = async () => {
    try {
      setLoading(true);
      const res = await API.post(`/cart/create/${_id}`);
      const cartItems = res.data.map(({ item }) => item);
      dispatch({
        type: "MODIFY_CART",
        payload: cartItems,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async () => {
    try {
      setLoading(true);
      const res = await API.post(`/wishlist/create/${_id}`);
      const wishlistItems = res.data;
      dispatch({
        type: "MODIFY_WISHLIST",
        payload: wishlistItems,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.wishbutton}>
          {!isLoading && (
            <i
              className="fa fa-heart fa-xl"
              style={{ color: state.wishlist.includes(_id) ? "red" : "black" }}
              onClick={addToWishlist}
            ></i>
          )}{" "}
          {isLoading && <i className="fa-solid fa-spinner fa-xl"></i>}
        </div>
        <img className={styles.productimage} src={img} alt="product" />

        <div>
          <p className={styles.producttitle}>{textConverter(name)}</p>
          <p className={styles.productprice}>₹{price}</p>
          <p
            className={styles.productstock}
            style={{ color: stock === "In stock" ? "inherit" : "grey" }}
          >
            {stock}
          </p>

          <p className={styles.productdelivery}>{delivery}</p>
        </div>
      </div>
      {!isLoading && state.cart.includes(_id) && stock === "In stock" ? (
        <button className={styles.addbutton} onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      ) : !isLoading && !state.cart.includes(_id) && stock === "In stock" ? (
        <button className={styles.addbutton} onClick={addToCart}>
          Add to Cart
        </button>
      ) : !isLoading ? (
        <button disabled className={styles.disabledbutton}>
          Add to Cart
        </button>
      ) : null}
      {isLoading && <button className={styles.addbutton}>Adding...</button>}
    </div>
  );
};

export default Card;
