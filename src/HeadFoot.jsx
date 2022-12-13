import React from 'react'
import MainPage from './MainPage'
import styles from './HeadFoot.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import line from './yyj_line.png'

const Head = () => {
    return (
        <div className={styles['nav-container']}>
            <nav className={styles.nav}>
                <div className={styles.nav__title}>
                    <p>ThingShop</p>
                </div>
                <div className={styles.nav__content}>
                    <FontAwesomeIcon icon="fa-regular fa-bag-shopping" />
                    <a href="#" className={styles['nav__content--link nav__content--link-1']}>My Account</a>
                    <a href="#" className={styles['nav__content--link content--link-2']}>Login</a>
                    <a href="#" className={styles['nav__content--signup']}>Sign Up</a>
                </div>
            </nav>
        </div>
    )
}

const Foot = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__heading}>
                <h3>Get started for free</h3>
                <p>Selling stuff here is absolutely free.</p>
                <button>Sign Up Now</button>
            </div>
            <div className={styles.footer__line}></div>
            <div className={styles.footer__end}>
                <p className={styles['footer__end--copyright']}>&copy; 2022 ThingShop</p>
                <div className={styles['footer__end--logo']}>
                    <img src="" alt="" />
                    <p>ThingShop</p>
                </div>
                <div className={styles['footer__end--icons']}>
                    <FontAwesomeIcon icon="fa-brands fa-square-github" />
                    <FontAwesomeIcon icon="fa-brands fa-square-instagram" />
                    <FontAwesomeIcon icon="fa-brands fa-square-facebook" />
                </div>
            </div>
        </div>
    )
}

const HeadFoot = () => {
  return (
    <div>
      <Head />
      <MainPage />
      <Foot />
    </div>
  )
}

export default HeadFoot
