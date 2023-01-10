import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { update } from "../../store/cartSlice";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/cart/${auth.user._id}`);
      const json = await response.json();
      dispatch(update(json.data));
    })();
  }, []);

console.log(cart)

  return (
    <div className={styles.cart}>
      <h2>My Cart</h2>
      <ul className={styles.cart_content}>
        {cart.products.map((product) => {
          return (
            <li>
              {product.title} <p> ${product.price}</p>
            </li>
          );
        })}
      </ul>

      <Link to="/checkout">Go To Checkout</Link>
    </div>
  );
};

export default Cart;
