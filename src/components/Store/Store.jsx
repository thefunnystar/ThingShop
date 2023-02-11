import React from "react";
import styles from "./Store.module.scss";
import { add } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Transformation } from "cloudinary-react";

const Store = ({ store }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  async function addToCart(product) {
    console.log(product);

    if (cart.products.includes(product._id)) {
      alert("No more than one of each item allowed per cart.");
    } else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
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
  }
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
                <Image
                  publicId={p.imagePublicId}
                  cloudName="dewmswl3s"
                  className={styles["shop-container__product--img"]}
                >
                  {/* <Transformation crop="scale" width="200" /> */}
                </Image>
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
