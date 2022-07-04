import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { API } from "../../server";
import styles from "./signup.module.css";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const handleData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/signup", user);
      console.log(res);
      if (res.status === 200) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {" "}
      <div className={styles.container}>
        <form className={styles.signupform} onSubmit={signup}>
          <h3>Sign Up</h3>
          <div className={styles.formdata}>
            <label className={styles.formlabel}>Name : </label>
            <input
              onChange={handleData}
              className={styles.forminput}
              name="name"
              value={user.name}
              type="text"
            />
          </div>

          <div className={styles.formdata}>
            {" "}
            <label className={styles.formlabel}>Email : </label>
            <input
              onChange={handleData}
              className={styles.forminput}
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
          <div className={styles.formdata}>
            <label className={styles.formlabel}>Confirm Password : </label>
            <input
              className={styles.forminput}
              onChange={handleData}
              name="confirmpassword"
              value={user.confirmpassword}
              type="password"
            />
          </div>

          <button className={styles.submitbutton}>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
