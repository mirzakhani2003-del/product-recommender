import React from 'react';
import styles from "./productcard.module.scss";

const ProductCard = ( {product} ) => {
  return (
    <article className={styles.productCard}>
        <img src={product.image} alt={product.title} />

        <h2>{product.title}</h2>

        <p>${product.price}</p>

        <p>{product.category}</p>
    </article>
  )
}

export default ProductCard;