import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("itemss", cart.items);
  }, []);

  return (
    <div className={styles.cart}>
      <h2>My Cart</h2>
      <ul className={styles.cart_content}>
        {cart.items.map((item) => {
          return (
            <li>
              {item.title} <p> ${item.price}</p>
            </li>
          );
        })}
      </ul>

      <Link to="/checkout">Go To Checkout</Link>
    </div>
  );
};

export default Cart;
