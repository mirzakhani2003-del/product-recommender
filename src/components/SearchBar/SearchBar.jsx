import React from "react";
import styles from "./search.module.scss";

export const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="search">Search Products</label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};
