import React from "react";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import styles from "./card.module.css";

const Card = ({ product }) => {
  const { state, dispatch } = useProduct();

  const { delivery, img, name, price, stock, _id } = product;

  const addToWishlist = (id) => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: state.wishlist.includes(id)
        ? state.wishlist.filter((ele) => ele !== id)
        : [...state.wishlist, id],
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
          <p>{price}</p>
          <p>{stock}</p>
          <p style={{ fontSize: 15 }}>{delivery}</p>
        </div>
      </div>
      <button className={styles.addbutton}>Add to Cart</button>
    </div>
  );
};

export default Card;
