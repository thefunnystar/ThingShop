import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { update } from "../../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  console.log(cart);

async function handleRemove(product) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/removeitem`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: auth.user._id,
      product: product,
    }),
  });
  const json = await res.json();
  console.log(json);
  dispatch(update(json.data));
}

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
              <button onClick={() => {handleRemove(product)}}>Remove</button>
            </div>
          );
        })}
        <Link to="/checkout" className={styles.link}>Go To Checkout</Link>
      </ul>

      
    </div>
  );
}

export default Cart;
