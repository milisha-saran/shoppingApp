import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import styles from "./product.module.css";

const Products = () => {
  const [products, setProducts] = useState(new Array(13).fill(1));

  // useEffect(() => {
  //   then((res) => {
  //     setProducts(res);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  return (
    <div className={styles.cards}>
      {products.map((product, index) => {
        return <Card />;
      })}
    </div>
  );
};

export default Products;
