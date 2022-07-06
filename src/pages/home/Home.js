import React, { useEffect } from "react";
import Slider from "react-slick";
import Layout from "../../components/layout/Layout";
import { useProduct } from "../../context/ProductProvider";
import { createCategory } from "../../helper/category";
import { API } from "../../server";

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  return (
    <Layout>
      <div>
        {state.allCategory.map((category) => {
          return (
            <Slider {...settings}>
              <div>
                <h3>{category}</h3>
              </div>
            </Slider>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
