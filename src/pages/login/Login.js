import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useProduct } from "../../context/ProductProvider";
import { API, setApiHeader } from "../../server";
import styles from "./login.module.css";

const Login = () => {
  const { dispatch } = useProduct();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/signin", user);

      if (res.status === 200) {
        const { accessToken, refreshToken, userData } = res.data;
        const { cart, wishlist } = userData;
        setApiHeader(accessToken);
        window.localStorage.setItem("rtoken", refreshToken);
        dispatch({ type: "MODIFY_CART", payload: cart });
        dispatch({ type: "MODIFY_WISHLIST", payload: wishlist });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.loginform} onSubmit={login}>
        <h3>Log In</h3>
        <div className={styles.formdata}>
          <label className={styles.formlabel}>Email : </label>
          <input
            className={styles.forminput}
            onChange={handleData}
            name="email"
            value={user.email}
            type="email"
          />
        </div>

        <div className={styles.formdata}>
          <label className={styles.formlabel}>Password : </label>
          <input
            onChange={handleData}
            className={styles.forminput}
            name="password"
            value={user.password}
            type="password"
          />
        </div>
        <button className={styles.submitbutton}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
