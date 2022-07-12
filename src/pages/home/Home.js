import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../../components/layout/Layout";
import styles from "./home.module.css";
import { useProduct } from "../../context/ProductProvider";
import { createCategory } from "../../helper/category";
import { API } from "../../server";
import mobile from "../../assets/mobile.jpg";
import laptop from "../../assets/laptop.jpg";
import tv from "../../assets/tv.jpeg";
import watch from "../../assets/watch.jpg";
import earphone from "../../assets/earphone.jpg";
import storage from "../../assets/storage.jpg";
import gadgets from "../../assets/gadgets.jpg";

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

  const settings = {
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "60px",
    // slidesToShow: 3,
    // speed: 500,
    // accessibility: true,
    // dots: true,
    // arrows: true,
    dots: true,

    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Slider className={styles.slider} {...settings}>
          <div>
            <h3>Phone</h3>
            <img className={styles.image} src={mobile} alt="mobile" />
          </div>
          <div>
            <h3>Laptop</h3>
            <img className={styles.image} src={laptop} alt="laptop" />
          </div>
          <div>
            <h3>Watch</h3>
            <img className={styles.image} src={watch} alt="watch" />
          </div>
          <div>
            <h3>Storage</h3>
            <img className={styles.image} src={storage} alt="storage" />
          </div>
          <div>
            <h3>TV</h3>
            <img className={styles.image} src={tv} alt="tv" />
          </div>
          <div>
            <h3>Earphones</h3>
            <img className={styles.image} src={earphone} alt="earphone" />
          </div>
          <div>
            <h3>All</h3>
            <img className={styles.image} src={gadgets} alt="gadgets" />
          </div>
        </Slider>
      </div>
    </Layout>
  );
};

export default Home;
