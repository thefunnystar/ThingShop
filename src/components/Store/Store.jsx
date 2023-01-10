import React from "react";
import styles from "./Store.module.scss";
import { add } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Store = ({ store }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const addToCart = async (p) => {
    console.log(p);

    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: auth.user._id,
        product: p,
      }),
    });
    const json = await res.json();
    console.log(json);

    window.location.reload();
  };
  return (
    <div className={styles["shop"]}>
      <div className={styles["shop__header"]}>
        <p>{store.name}</p>
      </div>
      <div className={styles["shop-container"]}>
        {store.products.length > 0 &&
          store.products.map((p) => {
            return (
              <div className={styles["shop-container__product"]}>
                <img
                  src={p.img}
                  alt="Product IMG"
                  className={styles["shop-container__product--img"]}
                />
                <p className={styles["shop-container__product--name"]}>
                  {p.title}
                </p>
                <p className={styles["shop-container__product--price"]}>
                  ${p.price}
                </p>
                <button
                  onClick={(e) => addToCart(p)}
                  className={styles["shop-container__product--btn"]}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Store;
