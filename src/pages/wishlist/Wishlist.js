import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./wishlist.module.css";
import { textConverter } from "../../helper/textConverter";

import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { API } from "../../server";
import WishlistCard from "./WishlistCard";

import wishlist from "../../assets/wishlist-empty.png";

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
        setLoader(false);
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
      {state.wishlist.length !== 0 && !loader ? (
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
      )}
    </Layout>
  );
};

export default Wishlist;
