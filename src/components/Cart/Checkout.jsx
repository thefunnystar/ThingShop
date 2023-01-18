import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { update } from "../../store/cartSlice";
import styles from "./Checkout.module.scss"

function Checkout() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/${auth.user._id}`,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();
      dispatch(update(json.data));
    })();
  }, []);
  return (
    <div className={styles.checkout}>
      <h1>Thanks for shopping!</h1>
    </div>
  );
}

export default Checkout;
