import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import Sidebar from "../../components/sidebar/Sidebar";
import { useProduct } from "../../context/ProductProvider";
import { createCategory } from "../../helper/category";
import { API } from "../../server";
import styles from "./product.module.css";

const Products = () => {
  const { state, dispatch } = useProduct();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    (async () => {
      try {
        const res = await API("/product");

        if (res.status === 200) {
          setLoader(false);
          dispatch({ type: "FETCH_PRODUCTS", payload: res.data });

          dispatch({ type: "SET_PRODUCTS", payload: res.data });

          dispatch({
            type: "FETCH_CATEGORY",
            payload: createCategory(res.data),
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Layout>
      {!loader ? (
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.cards}>
            {state.modifiedProducts.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Products;
