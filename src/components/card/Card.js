import React from "react";
import { textConverter } from "../../helper/textConverter";
import styles from "./card.module.css";

const Card = ({ product }) => {
  const { delivery, img, name, price, stock } = product;

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.wishbutton}>
          <i className="fa fa-heart fa-xl" style={{ color: "red" }}></i>
        </div>
        <img className={styles.productimage} src={img} alt="banana" />

        <div>
          <p className={styles.producttitle}>{textConverter(name)}</p>
          <p>{price}</p>
          <p>{stock}</p>
          <p style={{ fontSize: 15 }}>{delivery}</p>
        </div>
      </div>
      <button className={styles.addbutton}>Add to Cart</button>
    </div>
  );
};

export default Card;
