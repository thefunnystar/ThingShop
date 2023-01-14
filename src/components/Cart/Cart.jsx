
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);


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
