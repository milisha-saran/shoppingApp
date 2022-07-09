import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./wishlist.module.css";
import { textConverter } from "../../helper/textConverter";

import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { API } from "../../server";

const Wishlist = () => {
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [products, setProduct] = useState([]);
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  const deleteFromWishlist = async (_id) => {
    try {
      setLoadingWishlist(true);
      const res = await API.post(`/wishlist/delete/${_id}`);
      const newProducts = products.filter((product) =>
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

  const addToCart = async (_id) => {
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

  useEffect(() => {
    (async () => {
      try {
        if (state.userid) {
          const res = await API("/wishlist");
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
        {products.map(({ img, price, name, _id }) => {
          return (
            <div className={styles.card} key={_id}>
              <div>
                <div className={styles.deletebutton}>
                  <i
                    className="fa-solid fa-trash fa-lg"
                    onClick={() => deleteFromWishlist(_id)}
                  ></i>
                </div>
                <img className={styles.productimage} src={img} alt="product" />

                <div>
                  <p className={styles.producttitle}>{name}</p>
                  <p className={styles.productprice}>₹ {price}</p>
                </div>
              </div>
              {!isLoadingCart && state.cart.includes(_id) ? (
                <button
                  className={styles.addbutton}
                  onClick={() => navigate("/cart")}
                >
                  Go to Cart
                </button>
              ) : !isLoadingCart && !state.cart.includes(_id) ? (
                <button
                  className={styles.addbutton}
                  onClick={() => addToCart(_id)}
                >
                  Add to Cart
                </button>
              ) : null}
              {isLoadingCart && (
                <button className={styles.addbutton}>Adding...</button>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Wishlist;
