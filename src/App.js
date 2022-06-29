import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Products from "./pages/products/Products";
import Wishlist from "./pages/wishlist/Wishlist";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
