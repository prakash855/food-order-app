import React, { useEffect, useState } from "react";
import { useCart } from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ showCartHandler }) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const { items } = useCart();
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ``
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => clearInterval(timer);
  }, [items]);

  return (
    <button onClick={showCartHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
