import React from 'react'
import styles from './LogReg.module.scss'

const Login = () => {
  return (
    <div className={styles.login}>
      <h1>Sign In</h1>
      <p>If you need to sign up, click <a href='#'>here</a>.</p>
      <input type="email" placeholder='Email' required />
      <input type='password' placeholder='Password' required />
      <button>Login</button>
    </div>
  )
}

export default Login
