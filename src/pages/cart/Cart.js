import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { useProduct } from "../../context/ProductProvider";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { priceCalculator } from "../../helper/priceCalculator";
import { API } from "../../server";
import CartCard from "./CartCard";
import StripeCheckout from "react-stripe-checkout";
import cart from "../../assets/emptycart.png";

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

  const handleToken = () => {};

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
        {state.cart.length !== 0 ? (
          <div className={styles.paymentcard}>
            <p className={styles.paymenttitle}>Price Details</p>
            <p className={styles.paymentdetails}>Total price : ₹ {amount}</p>
            <p className={styles.paymentdetails}>Discount : - ₹ {discount} </p>
            <p className={styles.paymentdetails}>
              Delivery Charges : ₹ {delivery}
            </p>
            <p className={styles.paymentfinal}>Total Amount : ₹ {total}</p>
            <StripeCheckout
              stripeKey="pk_test_51LKdagSGDU5efwU1ruPmOuJBKUWu3EwVg2Zfwfhz8SBwgZ56bxpsesxvS2KLLliINxNLR7ABV1eX2cBrZZoecMKk006joxW3ec"
              token={handleToken}
              amount={total * 100}
              currency="inr"
              name="8Gadget"
              billingAddress
              shippingAddress
            />
          </div>
        ) : (
          <div className={styles.container}>
            <img className={styles.emptycart} src={cart} alt="empty cart" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
