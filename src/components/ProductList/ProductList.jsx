import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";

const ProductList = ({ products }) => {
  return (
    <section className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;