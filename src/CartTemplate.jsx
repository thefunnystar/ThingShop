import React from 'react'
import styles from './Cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Cart() {
  return (
    <div className={styles.cart}>
        <h1 className={styles.cart__title}>Your Cart</h1>
        <div className={styles.cart__item}>
            <div className={styles['shop-container__product']}>
                <img src="./kimono_1.jpg" alt="" />
                <p className={styles['shop-container__product--name']}>Standard Kimono</p>
                <p className={styles['shop-container__product--price']}>$235</p>
            </div>
            <button><span><FontAwesomeIcon icon="fa-light fa-circle-minus" /></span> Remove</button>
        </div>
        <button className={styles.cart__checkout}>Checkout</button>
    </div>
  )
}

export default Cart
