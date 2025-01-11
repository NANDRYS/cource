import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classname";

const Input = forwardRef(function Input(
  { className, isValid = true, apperance, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: apperance === "title",
      })}
    />
  );
});
export default Input;
