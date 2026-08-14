import React from "react";
import styles from "./header.module.scss";

export const Header = ({ cartCount }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.header__logo}>Product Recommender</h1>

        <div className={styles.header__cart}>
          <span>🛒</span>
          <span>Cart ({cartCount})</span>
        </div>
      </div>
    </header>
  );
};
