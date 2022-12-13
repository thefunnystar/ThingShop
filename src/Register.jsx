import React from 'react'
import styles from './LogReg.module.scss'

const Register = () => {
  return (
    <div className={styles.register}>
      <h1>Create an Account</h1>
      <p>You may use a YOPmail email address.</p>
      <input type="email" placeholder='Email' required />
      {/* Add eye icon as placeholder on right side to show the password */}
      <input type='password' placeholder='Password' required />
      <button>Create Account</button>
      <p>Already have an account? <a href='#'>Sign Up</a></p>
    </div>
  )
}

export default Register
