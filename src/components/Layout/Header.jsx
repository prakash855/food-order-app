import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

import mealsImg from "../../assets/meals.jpg";

const Header = ({ showCartHandler }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>e-Meals</h1>
        <HeaderCartButton showCartHandler={showCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
