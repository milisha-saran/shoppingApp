import React, { useState } from "react";
import styles from "./wishlist.module.css";
import { API } from "../../server";
import { useProduct } from "../../context/ProductProvider";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ product, setProduct }) => {
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();
  const { img, price, name, _id } = product;

  const deleteFromWishlist = async () => {
    try {
      setLoadingWishlist(true);
      const res = await API.post(`/wishlist/delete/${_id}`);
      const newProducts = state.products.filter((product) =>
        res.data.includes(product._id)
      );
      setProduct(newProducts);
      dispatch({
        type: "MODIFY_WISHLIST",
        payload: Array.from(new Set(res.data)),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const addToCart = async () => {
    try {
      setLoadingCart(true);
      const res = await API.post(`/cart/create/${_id}`);
      const cartItems = res.data.map(({ item }) => item);

      dispatch({
        type: "MODIFY_CART",
        payload: Array.from(new Set(cartItems)),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.deletebutton}>
          <i
            className="fa-solid fa-trash fa-lg"
            onClick={deleteFromWishlist}
          ></i>
        </div>
        <img className={styles.productimage} src={img} alt="product" />

        <div>
          <p className={styles.producttitle}>{name}</p>
          <p className={styles.productprice}>₹ {price}</p>
        </div>
      </div>
      {!isLoadingCart && state.cart.some((product) => product.item === _id) ? (
        <button className={styles.addbutton} onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      ) : !isLoadingCart &&
        !state.cart.some((product) => product.item === _id) ? (
        <button className={styles.addbutton} onClick={addToCart}>
          Add to Cart
        </button>
      ) : null}
      {isLoadingCart && <button className={styles.addbutton}>Adding...</button>}
    </div>
  );
};

export default WishlistCard;
