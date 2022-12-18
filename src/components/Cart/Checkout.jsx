import { useRef, useState } from "react";
import { isEmpty, isFiveChar } from "../../utlis";
import classes from "./Checkout.module.css";

const Checkout = ({ hideCartHandler, submitOrderHandler }) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef(),
    streetInputRef = useRef(),
    postalCodeInputRef = useRef(),
    cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value,
      enteredStreet = streetInputRef.current.value,
      enteredPostalCode = postalCodeInputRef.current.value,
      enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName),
      enteredStreetIsValid = !isEmpty(enteredStreet),
      enteredPostalCodeIsValid = isFiveChar(enteredPostalCode),
      enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) return;

    submitOrderHandler({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = formInputValidity.name
      ? classes.control
      : `${classes.control} ${classes.invalid}`,
    streetControlClasses = formInputValidity.street
      ? classes.control
      : `${classes.control} ${classes.invalid}`,
    postalCodeControlClasses = formInputValidity.postalCode
      ? classes.control
      : `${classes.control} ${classes.invalid}`,
    cityControlClasses = formInputValidity.city
      ? classes.control
      : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Your street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Your postal code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">Your city</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button onClick={hideCartHandler} type="button">
          Cancle
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
