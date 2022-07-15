import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./wishlist.module.css";
import { textConverter } from "../../helper/textConverter";

import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { API } from "../../server";
import WishlistCard from "./WishlistCard";

import wishlist from "../../assets/wishlist-empty.png";
import Loader from "../../components/loader/Loader";

const Wishlist = () => {
  const [loader, setLoader] = useState(false);
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [products, setProduct] = useState([]);
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    (async () => {
      try {
        if (state.userid) {
          const res = await API("/wishlist");
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  return (
    <Layout>
      {!loader ? (
        state.wishlist.length !== 0 ? (
          <div className={styles.layout}>
            {products.map((product) => {
              return (
                <WishlistCard
                  key={product._id}
                  product={product}
                  setProduct={setProduct}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.container}>
            <img
              className={styles.emptywishlist}
              src={wishlist}
              alt="empty wishlist"
            />
          </div>
        )
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Wishlist;
