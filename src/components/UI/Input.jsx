import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(({ label, input }, ref) => {
  return (
    <div className={classes.Input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} ref={ref} />
    </div>
  );
});

export default Input;
