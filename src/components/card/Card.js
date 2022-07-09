import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import { API } from "../../server";
import styles from "./card.module.css";

const Card = ({ product }) => {
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  const { delivery, img, name, price, stock, _id } = product;

  const addToCart = async () => {
    try {
      setLoadingCart(true);
      const res = await API.post(`/cart/create/${_id}`);
      const cartItems = res.data.map(({ item }) => item);
      dispatch({
        type: "MODIFY_CART",
        payload: Array.from(new Set(cartItems)),
      });
      console.log(Array.from(new Set(cartItems)));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCart(false);
    }
  };

  const addToWishlist = async () => {
    try {
      setLoadingWishlist(true);
      const res = await API.post(`/wishlist/create/${_id}`);
      const wishlistItems = res.data;
      dispatch({
        type: "MODIFY_WISHLIST",
        payload: Array.from(new Set(wishlistItems)),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.wishbutton}>
          {!isLoadingWishlist && (
            <i
              className="fa fa-heart fa-xl"
              style={{ color: state.wishlist.includes(_id) ? "red" : "black" }}
              onClick={addToWishlist}
            ></i>
          )}{" "}
          {isLoadingWishlist && <i className="fa-solid fa-spinner fa-xl"></i>}
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
      {!isLoadingCart && state.cart.includes(_id) && stock === "In stock" ? (
        <button className={styles.addbutton} onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      ) : !isLoadingCart &&
        !state.cart.includes(_id) &&
        stock === "In stock" ? (
        <button className={styles.addbutton} onClick={addToCart}>
          Add to Cart
        </button>
      ) : !isLoadingCart ? (
        <button disabled className={styles.disabledbutton}>
          Add to Cart
        </button>
      ) : null}
      {isLoadingCart && <button className={styles.addbutton}>Adding...</button>}
    </div>
  );
};

export default Card;
