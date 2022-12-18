import { useState } from "react";
import { API } from "../../api";
import { useCart } from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ hideCartHandler }) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const { items, totalAmount, addItem, removeItem, clearItem } = useCart();

  const cartItemAddHandler = (item) => addItem({ ...item, amount: 1 });
  const cartItemRemoveHandler = (id) => removeItem(id);
  const orderHandler = () => setIsCheckOut(true);

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    (async () => {
      try {
        const response = await fetch(`${API}/orders.json`, {
          method: `POST`,
          body: JSON.stringify({ userData, orderedItems: items }),
        });
        if (!response.ok) throw new Error(`Something went wrong!`);
      } catch (error) {
        console.log(error);
      }
    })();
    setIsSubmitting(false);
    setDidSubmit(true);
    clearItem();
  };

  const cartItem = (
    <ul className={classes[`cart-items`]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const hasItem = items.length > 0;
  const formattedAmount = `$${totalAmount.toFixed(2)}`;

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={hideCartHandler} className={classes[`button--alt`]}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{formattedAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout
          hideCartHandler={hideCartHandler}
          submitOrderHandler={submitOrderHandler}
        />
      )}
      {!isCheckOut && modalActions}
    </>
  );

  const isSubmittingContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={hideCartHandler} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal hideCartHandler={hideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
