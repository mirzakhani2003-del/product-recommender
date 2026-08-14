import React from "react";
import styles from "./cart.module.scss";

export const Cart = ({ cart, onRemove, onIncrease, onDecrease }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section className={styles.cart}>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div className={styles.cartItem} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className={styles.cartItem__info}>
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <div className={styles.cartItem__quantity}>
                  <button onClick={() => onDecrease(item.id)}> - </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)}> + </button>
                </div>
                <button onClick={() => onRemove(item.id)}>Remove Item</button>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <p>
              Items: <strong>{totalItems}</strong>
            </p>
            <p>
              Total: <strong>{totalPrice.toFixed(2)}</strong>
            </p>
          </div>
        </>
      )}
    </section>
  );
};
