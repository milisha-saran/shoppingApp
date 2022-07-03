import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../server";

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
    <div>
      <form onSubmit={signup}>
        <label className="label">Name</label>
        <input
          onChange={handleData}
          className=""
          name="name"
          value={user.name}
          type="text"
        />

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
        <label className="label">Confirm Password</label>
        <input
          onChange={handleData}
          className=""
          name="confirmpassword"
          value={user.confirmpassword}
          type="password"
        />

        <button className="">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
