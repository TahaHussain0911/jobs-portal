import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { numberRegEx } from "../../helper/regex";
import classes from "./input.module.css";
import ErrorText from "../ErrorText";

/**
 * Primary UI component for user interaction
 */
const Input = ({
  type,
  label,
  label2,
  name,
  value,
  setter,
  noBorder,
  placeholder,
  disabled,
  parentCustomStyle,
  customStyle,
  inputStyle,
  labelStyle,
  error,
  errorText,
  leftIcon,
  rightIcon,
  regexType,
  labelClassName,
  enterClick,
  labelOnTop = false,
  onChange,
  onBlur,
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);
  let inputContainerStyleObject = Object.assign(
    {},
    error && { border: `1px solid red ` },
    leftIcon && { paddingInlineStart: "50px" }
  );
  return (
    <>
      <div
        className={`${[labelOnTop ? classes.labelOnTop : ""].join(" ")}`}
        style={{ ...parentCustomStyle }}
      >
        {label && (
          <label
            htmlFor={`input${label}`}
            className={`${[
              classes.labelText,
              labelClassName && labelClassName,
              disabled && classes.disabled,
              labelOnTop ? classes.onTopLabel : "",
            ].join(" ")}`}
            style={{ ...labelStyle }}
          >
            {label} {label2 && label2}
          </label>
        )}
        <div
          className={`${[classes.inputPassContainer].join(" ")}`}
          style={{ ...customStyle }}
        >
          {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
          <input
            value={value}
            onKeyDown={(e) => {
              if (e?.key === "Enter") {
                if (enterClick) enterClick();
              }
            }}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
                return;
              }
              if (regexType == "number" || type == "number") {
                setter(e?.target?.value?.replace(numberRegEx, ""));
              } else {
                setter(e.target.value);
              }
            }}
            disabled={disabled}
            placeholder={placeholder}
            type={passToggle == true ? "text" : type}
            id={`input${label}`}
            className={` ${[
              classes.inputBox,
              noBorder && classes.noBorder,
            ].join(" ")}`}
            style={{ ...inputStyle, ...inputContainerStyleObject }}
            onBlur={() => {
              setter && setter(value?.trim());
            }}
            name={name}
            {...props}
          />
          {rightIcon && <div className={classes.rightIcon}>{rightIcon}</div>}

          {type == "password" && passToggle == false && (
            <FaEyeSlash
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
          {type == "password" && passToggle && (
            <FaEye
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
        </div>
        {error && <ErrorText text={errorText} />}
      </div>
    </>
  );
};
export default Input;
