import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { priceCalculator } from "../../helper/priceCalculator";
import { API } from "../../server";

const Cart = () => {
  const { state, dispatch } = useProduct();
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [products, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const deleteFromCart = async (_id) => {
    try {
      setLoadingCart(true);
      const res = await API.post(`/cart/delete/${_id}`);

      const cartIDs = res.data.map((product) => product.item._id);

      const newProducts = products.filter((product) =>
        cartIDs.includes(product._id)
      );

      setProduct(newProducts);
      dispatch({
        type: "MODIFY_CART",
        payload: Array.from(new Set(cartIDs)),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCart(false);
    }
  };

  const moveToWishlist = async (_id) => {
    try {
      setLoadingWishlist(true);
      const res = await API.post(`/wishlist/create/${_id}`);
      const wishlistItems = res.data;
      dispatch({
        type: "MODIFY_WISHLIST",
        payload: Array.from(new Set(wishlistItems)),
      });
      deleteFromCart(_id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
  };

  useEffect(() => {
    (async () => {
      try {
        if (state.userid) {
          const res = await API("/cart");
          console.log(res.data);
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.userid]);

  return (
    <Layout>
      <div className={styles.layout}>
        <div>
          {products.map(({ item, quantity }) => {
            return (
              <div className={styles.card} key={item._id}>
                <div className={styles.product}>
                  <img
                    className={styles.productimage}
                    src={item.img}
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
                    <p className={styles.producttitle}>{item.name}</p>
                    <p className={styles.productprice}>₹ {item.price}</p>
                    <p className={styles.productdelivery}>{item.delivery}</p>
                  </div>
                  <div className={styles.cartactions}>
                    {!isLoadingWishlist && state.wishlist.includes(item._id) ? (
                      <button
                        className={styles.addbutton}
                        onClick={() => moveToWishlist(item._id)}
                      >
                        Move To Wishlist
                      </button>
                    ) : (
                      <button className={styles.addbutton}>Moving...</button>
                    )}
                    <div className={styles.deletebutton}>
                      <i
                        className="fa-solid fa-trash fa-lg"
                        onClick={() => deleteFromCart(item._id)}
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
          <p>Total price : </p>
          <p>Discount : </p>
          <p>Delivery Charges : </p>
          <p>Total Amount : </p>
          <button>Pay Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
