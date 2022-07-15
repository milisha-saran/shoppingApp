import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../../components/layout/Layout";
import styles from "./home.module.css";
import { useProduct } from "../../context/ProductProvider";
import { createCategory } from "../../helper/category";
import { API } from "../../server";
import mobile from "../../assets/phones.webp";

import tv from "../../assets/tvs.webp";
import watch from "../../assets/watches.webp";
import earphone from "../../assets/earphones.webp";
import storage from "../../assets/sd.webp";
import gadgets from "../../assets/all.webp";

const Home = () => {
  const { state, dispatch } = useProduct();

  useEffect(() => {
    (async () => {
      try {
        const res = await API("/product");

        if (res.status === 200) {
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

  // const settings = {
  //   className: styles.carousel,
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "60px",
  //   slidesToShow: 3,
  //   speed: 500,
  //   accessibility: true,
  //   dots: true,
  //   arrows: true,
  // };

  return (
    <Layout>
      {/* <div>
        <Slider {...settings}>
          <div>
            <img className={styles.image} src={mobile} alt="mobile" />
          </div>
          <div>
            <img className={styles.image} src={laptop} alt="laptop" />
          </div>
          <div>
            <img className={styles.image} src={watch} alt="watch" />
          </div>
          <div>
            <img className={styles.image} src={storage} alt="storage" />
          </div>
          <div>
            <img className={styles.image} src={tv} alt="tv" />
          </div>
          <div>
            <img className={styles.image} src={earphone} alt="earphone" />
          </div>
          <div>
            <img className={styles.image} src={gadgets} alt="gadgets" />
          </div>
        </Slider>
      </div> */}
      <div className={styles.container}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.name}>Phones</p>
            <img className={styles.image} src={mobile} alt="mobile" />
          </div>
          <div className={styles.card}>
            <p className={styles.name}>Storage</p>
            <img className={styles.image} src={storage} alt="laptop" />
          </div>
          <div className={styles.card}>
            <p className={styles.name}>Watch</p>
            <img className={styles.image} src={watch} alt="watch" />
          </div>
          <div className={styles.card}>
            <p className={styles.name}>TV</p>
            <img className={styles.image} src={tv} alt="tv" />
          </div>
          <div className={styles.card}>
            <p className={styles.name}>Earphones</p>
            <img className={styles.image} src={earphone} alt="earphone" />
          </div>
          <div className={styles.card}>
            <p className={styles.name}>All</p>
            <img className={styles.image} src={gadgets} alt="gadgets" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
