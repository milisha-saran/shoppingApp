import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductProvider";
import { API, setApiHeader } from "../../server";

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
    <div>
      <form onSubmit={login}>
        <label className="label">Email</label>
        <input
          onChange={handleData}
          className=""
          name="email"
          value={user.email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handleData}
          className=""
          name="password"
          value={user.password}
          type="password"
        />
        <button className="">Submit</button>
      </form>
    </div>
  );
};

export default Login;
