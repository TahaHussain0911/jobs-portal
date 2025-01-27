import React from "react";
import classes from "./Button.module.css";
const Button = ({
  label,
  className,
  customStyle,
  variant = "primary",
  onClick,
  disabled,
  leftIcon,
  rightIcon,
  type = "button",
  children,
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
        {leftIcon && leftIcon}
        {label}
        {children && children}
        {rightIcon && rightIcon}
      </button>
    </>
  );
};

export default Button;
