import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Sidebar from "../../components/sidebar/Sidebar";
import { API } from "../../server";
import styles from "./product.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API("/product");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  console.log(products);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.cards}>
        {products.map((product) => {
          return <Card key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
