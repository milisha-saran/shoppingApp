import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductProvider";
import { API } from "../../server";
import styles from "./cart.module.css";

const CartCard = ({ product, setProduct }) => {
  const { state, dispatch } = useProduct();
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [amount, setAmount] = useState(1);

  const { item, quantity } = product;

  const deleteFromCart = async () => {
    try {
      setLoadingCart(true);
      const res = await API.post(`/cart/delete/${item._id}`);

      const cartItems = state.products.filter((product) =>
        res.data.some((element) => element.item === product.item._id)
      );

      setProduct(cartItems);
      dispatch({
        type: "MODIFY_CART",
        payload: Array.from(new Set(res.data)),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCart(false);
    }
  };

  const moveToWishlist = async () => {
    try {
      setLoadingWishlist(true);
      const res = await API.post(`/wishlist/create/${item._id}`);
      const wishlistItems = res.data;
      dispatch({
        type: "MODIFY_WISHLIST",
        payload: Array.from(new Set(wishlistItems)),
      });
      deleteFromCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const increaseQuantity = () => {
    setAmount(amount + 1);
  };

  const decreaseQuantity = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(amount);
  };

  useEffect(() => {
    setAmount(quantity);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.product}>
        <img className={styles.productimage} src={item.img} alt="product" />
        <div>
          <div className={styles.quantity}>
            <button className={styles.modifybutton} onClick={decreaseQuantity}>
              -
            </button>
            <p> Quantity : {amount} </p>
            <button className={styles.modifybutton} onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.productinfo}>
          {" "}
          <p className={styles.producttitle}>{item.name}</p>
          <p className={styles.productprice}>₹ {item.price}</p>
          <p className={styles.productdelivery}>{item.delivery}</p>
        </div>
        <div className={styles.cartactions}>
          {!isLoadingWishlist ? (
            <button className={styles.addbutton} onClick={moveToWishlist}>
              Move To Wishlist
            </button>
          ) : (
            <button className={styles.addbutton}>Moving...</button>
          )}
          <div className={styles.deletebutton}>
            <i className="fa-solid fa-trash fa-lg" onClick={deleteFromCart}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
