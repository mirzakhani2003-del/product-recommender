import React from "react";
import styles from "./productcard.module.scss";

const ProductCard = ({ product, onSelect, onAddToCart }) => {
  return (
    <article className={styles.productCard} onClick={() => onSelect(product)}>
      <div className={styles.productCard__image}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.productCard__content}>
        <span className={styles.productCard__category}>{product.category}</span>

        <h2 className={styles.productCard__title}>{product.title}</h2>

        <div className={styles.productCard__bottom}>
          <span className={styles.productCard__price}>{product.price}</span>
          <button className={styles.productCard__botton} onClick={(event) => {
            event.stopPropagation();
            onAddToCart(product);
          }}>
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
