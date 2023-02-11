import React from "react";
import MainPage from "./MainPage";
import styles from "./HeadFoot.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import squareGithub from "./assets/svgs/square-github.svg";
import line from "./yyj_line.png";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

const Head = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function logoutHandler(e) {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={styles["nav-container"]}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.nav__title}>
          ThingShop
        </Link>
        <div className={styles.nav__content}>
          {auth.user ? (
            // // <link to="/myaccount">
            // //   <h3>{auth.user.fullname}</h3>
            // // </link>
            <div className={styles.nav__content}>
              <Link to="cart" className={styles["nav__content--cart"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
                <span>{cart.products.length}</span>
              </Link>
              <Link
                to="logout"
                onClick={logoutHandler}
                className={styles["nav__content--link"]}
              >
                Logout
              </Link>
              <Link
                to="myaccount"
                className={styles["nav__content--myaccount"]}
              >
                <h3>My Account</h3>
              </Link>
            </div>
          ) : (
            <>
              {" "}
              <Link to="login" className={styles["nav__content--link"]}>
                Login
              </Link>
              <Link to="register" className={styles["nav__content--signup"]}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

const Foot = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className={styles.footer}>
      {auth.user ? (
        ""
      ) : (
        <div className={styles.footer__heading}>
          <h3 className={styles["footer__heading--header"]}>
            Get started for free
          </h3>
          <p className={styles["footer__heading--text"]}>
            Selling stuff here is absolutely free.
          </p>
          <Link to="register" className={styles["footer__heading--signup"]}>
            Sign Up Now
          </Link>
          <img className={styles["footer__heading--line"]} src={line} alt="" />
        </div>
      )}
      {!auth.user ? (
        ""
      ) : (
        <div className={styles.footer__heading}>
          <h3 className={styles["footer__heading--header"]}>
            Welcome {auth.user.fullName}!
          </h3>
          <img className={styles["footer__heading--line"]} src={line} alt="" />
        </div>
      )}
      <div className={styles.footer__end}>
        <p className={styles["footer__end--copyright"]}>
          &copy; 2023 ThingShop
        </p>
        <div className={styles["footer__end--logo"]}>
          <p>&nbsp;</p>
          <p className={styles["footer__end--logo-text"]}>ThingShop</p>
        </div>
        <div className={styles["footer__end--icons"]}>
          <a href="https://github.com/thefunnystar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/brejar747/?hl=en">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100080877392101&mibextid=ZbWKwL">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export { Head, Foot };
