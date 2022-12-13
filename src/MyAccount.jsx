import React from 'react'
import styles from './MyAccount.module.scss'

const MyAccount = () => {
  return (
    <div className={styles.myaccount}>
      <div className={styles.edit}>
        <h1 className={styles.myaccount__title}>Edit Store</h1>
        <p className={styles['big-p']}>Change Store Name</p>
        <input type="text" placeholder='Store Name' />
        <div className={styles.edit__content}>
          <div className={styles['edit__content--add']}>
            <p className={styles['big-p']}>Add a Product</p>
            <input type="text" placeholder='Product Name' />
            <div>
              <p className={styles['big-p']}>Drag and Drop Image</p>
            </div>
          </div>
          <div className={styles['edit__content--del']}>
            <p className={styles['big-p']}>Delete Products</p>
            <div className={styles['shop-container__product']}>
                <img src="./kimono_1.jpg" alt="" />
                <p className={styles['shop-container__product--name']}>Standard Kimono</p>
                <p className={styles['shop-container__product--price']}>$235</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.delout}>
        <div className={styles.delout__item}>
          <h1>Would you like to delete your account?</h1>
          <button className={styles['delout__item--del']}>Delete Account</button>
        </div>
        <div className={styles.delout__item}>
          <h1>Would you like to logout instead?</h1>
          <button className={styles['delout__item--out']}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
