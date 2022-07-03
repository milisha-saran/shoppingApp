import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useProduct } from "./context/ProductProvider";

import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Products from "./pages/products/Products";
import SignUp from "./pages/sign up/SignUp";
import Wishlist from "./pages/wishlist/Wishlist";
import { API, setApiHeader } from "./server";

function App() {
  const { dispatch } = useProduct();

  const getNewTokens = async () => {
    try {
      const rtoken = localStorage.getItem("rtoken");
      const res = await API("/token/access", {
        headers: { "refresh-token": `Bearer ${rtoken}` },
      });
      const { accessToken, refreshToken } = res.data;
      setApiHeader(accessToken);
      window.localStorage.setItem("rtoken", refreshToken);
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const rtoken = localStorage.getItem("rtoken");
    (async () => {
      try {
        if (rtoken) {
          const accessToken = await getNewTokens();
          const res = await API("/user", {
            headers: { authorization: `Bearer ${accessToken}` },
          });
          const { cart, wishlist } = res.data;
          console.log(res);
          dispatch({ type: "MODIFY_CART", payload: cart });
          dispatch({ type: "MODIFY_WISHLIST", payload: wishlist });

          setInterval(async () => {
            getNewTokens();
          }, 8e6);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
