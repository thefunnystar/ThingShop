import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Store from "./components/Store/Store";
import Kimono1 from "././kimono_1.jpg";
import Kimono2 from "././kimono_2.jpg";
import Kimono3 from "././kimono_3.jpg";

const MainPage = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/stores");
      const json = await response.json();
      setStores((prev) => {
        return [...json.data];
      });
    })();
  }, []);
  return (
    <div>
      <div className={styles["main-container"]}>
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
};

export default MainPage;
