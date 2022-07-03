import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import styles from "./card.module.css";

const Card = ({ product }) => {
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  const { delivery, img, name, price, stock, _id } = product;

  const addToWishlist = (id) => {
    dispatch({
      type: "MODIFY_WISHLIST",
      payload: state.wishlist.includes(id)
        ? state.wishlist.filter((ele) => ele !== id)
        : [...state.wishlist, id],
    });
  };
  const addToCart = (id) => {
    dispatch({
      type: "MODIFY_CART",
      payload: state.cart.includes(id)
        ? state.cart.filter((ele) => ele !== id)
        : [...state.cart, id],
    });
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.wishbutton}>
          <i
            className="fa fa-heart fa-xl"
            style={{ color: state.wishlist.includes(_id) ? "red" : "black" }}
            onClick={() => addToWishlist(_id)}
          ></i>
        </div>
        <img className={styles.productimage} src={img} alt="product" />

        <div>
          <p className={styles.producttitle}>{textConverter(name)}</p>
          <p>₹{price}</p>
          <p>{stock}</p>
          <p style={{ fontSize: 15 }}>{delivery}</p>
        </div>
      </div>
      {state.cart.includes(_id) ? (
        <button className={styles.addbutton} onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      ) : (
        <button className={styles.addbutton} onClick={() => addToCart(_id)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Card;
