import React from 'react'
import styles from './CheckSuccess.module.scss'

function CheckSuccess() {
  return (
    <div>
        {/* Clear all cart items once this page is reached. */}
      <h1 className={styles.checkout__success}>Checkout was successful!</h1>
    </div>
  )
}

export default CheckSuccess
