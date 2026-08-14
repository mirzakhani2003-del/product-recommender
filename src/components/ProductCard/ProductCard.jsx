import React from "react";
import styles from "./productcard.module.scss";

const ProductCard = ({ product, onSelect }) => {
  return (
    <article className={styles.productCard} onClick={() => onSelect(product)}>
      <div className={styles.ProductCard__image}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.ProductCard__content}>
        <h2 className={styles.ProductCard__title}>{product.title}</h2>

        <p className={styles.ProductCard__price}>${product.price}</p>

        <p className={styles.ProductCard__category}>{product.category}</p>
      </div>
    </article>
  );
};

export default ProductCard;
