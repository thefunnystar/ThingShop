import HeadFoot from "./HeadFoot";
import MyAccount from "./MyAccount";
import MainPage from "./MainPage";
import Login from "./Login";
import Register from "./Register";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import { Head, Foot } from "./HeadFoot";

import Layout from "./components/Layout/Layout";

// routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
