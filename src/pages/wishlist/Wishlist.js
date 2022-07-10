import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./wishlist.module.css";
import { textConverter } from "../../helper/textConverter";

import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { API } from "../../server";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
  const [isLoadingWishlist, setLoadingWishlist] = useState(false);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [products, setProduct] = useState([]);
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();

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
    </Layout>
  );
};

export default Wishlist;
