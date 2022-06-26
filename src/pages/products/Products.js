import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Sidebar from "../../components/sidebar/Sidebar";
import { useProduct } from "../../context/ProductProvider";
import { API } from "../../server";
import styles from "./product.module.css";

const Products = () => {
  const { state, dispatch } = useProduct();

  useEffect(() => {
    (async () => {
      try {
        const res = await API("/product");
        dispatch({ type: "SET_PRODUCTS", payload: res.data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // console.log(products);
  console.log(state);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.cards}>
        {state.products.map((product) => {
          return <Card key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
