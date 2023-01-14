import HeadFoot from "./HeadFoot";
import MyAccount from "./MyAccount";
import MainPage from "./MainPage";
import Login from "./Login";
import Register from "./Register";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import { Head, Foot } from "./HeadFoot";
import React, { useEffect } from "react";
import { update } from "./store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";

// routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${auth.user._id}`);
      const json = await response.json();
      dispatch(update(json.data));
    })();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
