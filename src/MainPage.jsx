import React from 'react'
import styles from './MainPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MainPage = () => {
  return (
    <div>
      <div className={styles['main-container']}>
        <div className={styles['recent-items']}>
            <p className={styles['recent-items__header']}>Your Recently Viewed Items</p>
            <div className={styles['recent-items__container']}></div>
        </div>
        <div className={styles['shop']}>
            <div className={styles['shop__header']}>
                <p>Jashion</p>
                <div>
                    <p>See all</p>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                </div>
            </div>
            <div className={styles['shop-container']}>
                <div className={styles['shop-container__product']}>
                    <img src="./kimono_1.jpg" alt="" />
                    <p className={styles['shop-container__product--name']}>Standard Kimono</p>
                    <p className={styles['shop-container__product--price']}>$235</p>
                </div>
                <div className={styles['shop-container__product']}>
                    <img src="./kimono_2.jpg" alt="" />
                    <p className={styles['shop-container__product--name']}>Silk Kimono</p>
                    <p className={styles['shop-container__product--price']}>$456</p>
                </div>
                <div className={styles['shop-container__product']}>
                    <img src="./kimono_3.jpg" alt="" />
                    <p className={styles['shop-container__product--name']}>Handmade Kimono</p>
                    <p className={styles['shop-container__product--price']}>$2357</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
