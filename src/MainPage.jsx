import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import Store from "./components/Store/Store";

function MainPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`);
      const json = await response.json();
      setStores((prev) => {
        return [...json.data];
      });
    })();
  }, []);
  return (
    <div>
      <div className={styles["main-container"]}>
        {/* <Image publicId="sample" /> */}
        {stores.length > 0 && (
          <>
            {stores.map((store) => {
              return <Store store={store} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default MainPage;
