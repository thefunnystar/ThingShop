import React, { useState, useEffect } from "react";
import styles from "./LogReg.module.scss";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { login } from "./store/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json();
    if (json.success === true) {
      console.log(json.data);
      dispatch(login({ user: json.data }));
      navigate("/");
    } else {
      alert(json.message);
    }
  };
  return (
    <div className={styles.login}>
      <h1>Sign In</h1>
      <p>
        If you need to sign up, click <Link to="/register">here</Link>.
      </p>
      <input
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button onClick={submitHandler}>Login</button>
    </div>
  );
};

export default Login;
