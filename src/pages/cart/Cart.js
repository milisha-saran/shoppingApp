import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { priceCalculator } from "../../helper/priceCalculator";
import { API } from "../../server";
import CartCard from "./CartCard";

const Cart = () => {
  const { state, dispatch } = useProduct();

  const [products, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (state.userid) {
          const res = await API("/cart");

          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.userid]);

  const { total, amount, discount, delivery } = priceCalculator(products);

  return (
    <Layout>
      <div className={styles.layout}>
        <div>
          {products.map((product) => {
            return (
              <CartCard
                key={product.item._id}
                product={product}
                setProduct={setProduct}
              />
            );
          })}
        </div>
        <div className={styles.paymentcard}>
          <p className={styles.paymenttitle}>Price Details</p>
          <p className={styles.paymentdetails}>Total price : ₹ {amount}</p>
          <p className={styles.paymentdetails}>Discount : - ₹ {discount} </p>
          <p className={styles.paymentdetails}>
            Delivery Charges : ₹ {delivery}
          </p>
          <p className={styles.paymentfinal}>Total Amount : ₹ {total}</p>
          <button className={styles.paymentbutton}>Pay Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
