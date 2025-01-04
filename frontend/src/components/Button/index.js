import React from "react";
import classes from "./Button.module.css";
const Button = ({
  label,
  className,
  customStyle,
  variant = "primary",
  onClick,
  disabled,
  ...props
}) => {
  return (
    <>
      <button
        className={[classes.btnClass, className].join(" ")}
        style={customStyle}
        onClick={onClick}
        disabled={disabled}
        data-variant={variant}
        {...props}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
