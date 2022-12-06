import { useCart } from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ({ hideCartHandler }) => {
  const { items, totalAmount, addItem, removeItem } = useCart();
  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    removeItem(id);
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

  return (
    <Modal hideCartHandler={hideCartHandler}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{formattedAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={hideCartHandler} className={classes[`button--alt`]}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
