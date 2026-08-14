import React from "react";
import styles from "./pricefilter.module.scss";

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div className={styles.priceFilter}>
      <div>
        <label htmlFor="minPrice">Min Price: </label>
        <input
          id="minPrice"
          type="number"
          min="0"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="maxPrice">Max Price: </label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
        />
      </div>
    </div>
  );
};
