import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";

const ProductList = ({ products, onSelect }) => {
  return (
    <section className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect}/>
      ))}
    </section>
  );
};

export default ProductList;