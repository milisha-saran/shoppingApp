import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductProvider";
import { textConverter } from "../../helper/textConverter";
import { API } from "../../server";
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
  const addToCart = async (id) => {
    try {
      const res = await API.post(`/cart/create/${id}`);
      console.log(res);

      dispatch({
        type: "MODIFY_CART",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
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
      {state.cart.some((ele) => _id === ele.item) && stock === "In stock" ? (
        <button className={styles.addbutton} onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      ) : state.cart.some((ele) => _id !== ele.item) && stock === "In stock" ? (
        <button className={styles.addbutton} onClick={() => addToCart(_id)}>
          Add to Cart
        </button>
      ) : (
        <button disabled className={styles.disabledbutton}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Card;
