import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";

const ProductList = ({ products, onSelect, onAddToCart }) => {
  return (
    <section className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} onAddToCart={onAddToCart}/>
      ))}
    </section>
  );
};

export default ProductList;