import React, { useRef, useEffect, useState } from "react";
import styles from "./MyAccount.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ImageEditor from "./components/ImageEditor/ImageEditor";

function MyAccount() {
  const spaceRef = useRef(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState("");

  const [prodName, setProdName] = useState("");
  const [image, setImage] = useState(null);
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);

  const [products, setProducts] = useState([]);

  const [modal, setModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");

  async function newStoreHandler() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newStoreName,
        user: auth.user._id,
      }),
    });

    const json = await response.json();
    if (json.success) {
      setModal(false);
    }

    window.location.reload(false);
  };

  async function fetchProducts() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${store.id}`);
    const json = await response.json();

    if (json.success === true) {
      console.log("products>>", json.data);
      setProducts((prev) => {
        return [...json.data];
      });
    }
  };

  //
  async function changeStoreName() {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/stores/` + store.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: storeName,
      }),
    });

    const json = await response.json();
    setLoading(false);
    setStore({ ...json.data });
    setStoreName(json.data.name);
  };

  async function addNewProd() {
    if (prodName === "") {
      alert("add product name");
      return;
    }

    if (image === null) {
      alert("select some image");
      return;
    }

    if (price === 0) {
      alert("add price");
      return;
    }

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("file", image);
    formData.append("price", Number(price));
    formData.append("store", store._id);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",

      body: formData,
    });

    const json = await response.json();

    if (json.success === true) {
      await fetchProducts(store.id);
      clearForm();
    } else {
      alert("Error!");
    }
  };

  async function deleteHandler(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    if (json.success === true) {
      await fetchProducts();
    }
  };

  // Account Managment
  async function logoutHandler() {
    dispatch(logout());
    window.location.href = "/";
  };

  // delete
  async function accountDeleteHandler() {
    // delete and logout
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/` + auth.user._id, {
      method: "DELETE",
    });

    const json = await res.json();
    if (json.success) {
      dispatch(logout());
      window.location.href = "/";
    }
  };

  const clearForm = () => {
    setImage(null);
    setImg("");
    setPrice(0);
    setProdName("");
  };
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/stores/` + auth.user._id
      );
      const json = await response.json();
      if (json.success === true) {
        console.log(json.data);
        setStore({ ...json.data });
        setStoreName(json.data.name);

        setProducts((prev) => {
          return [...json.data.products];
        });
      } else {
        setModal(true);
      }
    })();
    console.log("PRODUCTS>>>>", products);
  }, []);

  return (
    <div className={styles.myaccount}>
      <div className={styles.edit}>
        <h1 className={styles.myaccount__title} ref={spaceRef}>
          Store Managment
        </h1>
        <div className={styles["user-info"]}>
          <p className={styles["user-info__username"]}>
            Name: {auth.user.fullName}
          </p>
          <p>Email: {auth.user.email}</p>
        </div>

        {modal && (
          <div className={styles.modal}>
            <div className={styles.modal_content}>
              <button onClick={(e) => setModal(false)} className={styles.close}>
                <FontAwesomeIcon icon={faX} />
              </button>

              <div className={styles.action}>
                <h1>Create a New Store</h1>
                <input
                  type="text"
                  placeholder="Store Name"
                  onChange={(e) => setNewStoreName(e.target.value)}
                />
                <button
                  className={styles["input__product--submit"]}
                  onClick={newStoreHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {store && (
          <div className={styles["myaccount__main"]}>
            <div className={styles.unnamed}>
              <p className={styles["big-p"]}>Change Store Name</p>
              <div className={styles["change-store-name__sub"]}>
                <input
                  className={loading ? styles.loading : ""}
                  type="text"
                  placeholder="Store Name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <button
                  className={
                    loading
                      ? styles.loading
                      : styles["input__product--submit-1"]
                  }
                  onClick={changeStoreName}
                >
                  Submit
                </button>
              </div>
              <div className={styles.edit__content}>
                <div className={styles["edit__content--add"]}>
                  <p className={styles["big-p"]}>Add a Product</p>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={prodName}
                    className={styles["input__product--name"]}
                    onChange={(e) => setProdName(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    className={styles["input__product--price"]}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div>
                    <p className={styles["big-p"]}>Upload Image</p>
                    <ImageEditor
                      setImage={setImage}
                      img={img}
                      setImg={setImg}
                    />
                  </div>
                  <button
                    className={styles["input__product--submit"]}
                    onClick={addNewProd}
                  >
                    Submit New Product
                  </button>
                </div>
              </div>
            </div>

            <div className={styles["edit__content--del"]}>
              <p className={styles["big-p"]}>Delete Products</p>
              <div className={styles["shop-container__product"]}>
                {products.length > 0 && (
                  <ul>
                    {products.map((p) => {
                      return (
                        <li className={styles.product}>
                          <img src={p.img} alt="" />
                          <div className={styles["product__text-container"]}>
                            <p
                              className={
                                styles["product__text-container--title"]
                              }
                            >
                              {p.title}
                            </p>
                            <p
                              className={
                                styles["product__text-container--price"]
                              }
                            >
                              ${p.price}
                            </p>
                            <button onClick={(e) => deleteHandler(p._id)}>
                              Delete Product
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.delout}>
        <div className={styles.delout__item}>
          <h1>Would you like to delete your account?</h1>
          <button
            className={styles["delout__item--del"]}
            onClick={accountDeleteHandler}
          >
            Delete Account
          </button>
        </div>
        <div className={styles.delout__item}>
          <h1>Would you like to logout instead?</h1>
          <button
            className={styles["delout__item--out"]}
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
