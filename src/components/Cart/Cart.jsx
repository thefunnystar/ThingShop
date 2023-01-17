import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  console.log(cart);

  return (
    <div className={styles.cart}>
      <h2>My Cart</h2>
      <ul className={styles.cart_content}>
        {cart.products.map((product) => {
          return (
            <div className={styles.cart__item}>
              <div className={styles["shop-container__product"]}>
                <div className={styles["text-container"]}>
                <img src={`${process.env.REACT_APP_API_URL}${product.img}`} alt="" />
                  <p className={styles["shop-container__product--name"]}>
                    {product.title}
                  </p>
                  <p className={styles["shop-container__product--price"]}>
                    {product.price}
                  </p>
                </div>
              </div>
              <button>Remove</button>
            </div>
          );
        })}
      </ul>

      <Link to="/checkout">Go To Checkout</Link>
    </div>
  );
}

export default Cart;
