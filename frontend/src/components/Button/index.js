import React from "react";
import classes from "./Button.module.css";
const Button = ({
  label,
  className,
  customStyle,
  variant = "primary",
  onClick,
  disabled,
  type = "button",
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
        type={type}
        {...props}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
