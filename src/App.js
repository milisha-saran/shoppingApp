import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useProduct } from "./context/ProductProvider";

import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
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
          const { cart, wishlist, _id } = res.data;
          console.log(res);

          dispatch({ type: "SET_USERID", payload: _id });
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
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
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

/*
app.get("/", (req,res)=>{
  res.send("hello world")
}) at page load

app.listen(3000, (req,res)=>{
  console.log("server started")
})

model = schema for the product
router = front-end API calls
router.route("/product").get(getProducts).post(createProducts)
controller = API calls and modifications
getProduct=async(req,res)=>{
  try{} catch(err){console.log(err.message)}
}

*/
