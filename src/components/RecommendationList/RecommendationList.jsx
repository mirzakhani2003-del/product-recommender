import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./recommend.module.scss";

export const RecommendationList = ({ selectedProduct, products, onAddToCart }) => {
  if (!selectedProduct) {
    return null;
  }

  const recommendedProducts = products.filter(
    (product) =>
      product.category === selectedProduct.category &&
      product.id !== selectedProduct.id,
  );

  return (
    <section className={styles.recommendations}>
      <h2>Similar Product</h2>

      <div className={styles.productList}>
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/>
        ))}
      </div>
    </section>
  );
};
