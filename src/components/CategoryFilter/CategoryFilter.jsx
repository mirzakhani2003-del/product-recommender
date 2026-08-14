import React from "react";
import styles from "./category.module.scss";

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className={styles.categoryFilter}>
      <button
        className={selectedCategory === "all" ? styles.active : ""}
        onClick={() => handleCategoryChange("all")}
      >
        All Product
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? styles.active : ""}
          onClick={() => {
            onCategoryChange(category);
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
