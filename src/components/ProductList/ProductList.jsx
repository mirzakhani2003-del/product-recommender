import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";

const ProductList = ({ products, onSelect, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No Products Found</h2>
        <p>try Changing Your Search or Filters</p>
      </div>
    );
  }

  return (
    <section className={styles.productList}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
};

export default ProductList;
