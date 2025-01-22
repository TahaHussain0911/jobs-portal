import React from "react";
import classes from "./DropDown.module.css";
import Select, { components } from "react-select";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const DropDown = ({
  options,
  value,
  setter,
  placeholder,
  placeholderColor = "var(--placeholder-color)",
  label,
  isMulti,
  optionLabel,
  optionValue,
  disabled,
  Components,
  customClassName = "DropdownOptionContainer",
  isSearchable = false,
  labelClassName,
  singleValueColor = "var(--black-color)",
  indicatorColor = "var(--heading-color)",
  customHoverColor,
  customActiveColor,
  styles,
  containerStyle,
  customStyle,
  optionContainerRadius = "12px",
  error,
  errorText,
}) => {
  const DropdownIndicator = (props) => {
    return (
      <>
        <style>
          {`
            .DropdownOptionContainer__indicator{
                padding: 2px;
                border-radius: 8px;
            }
        `}
        </style>
        <components.DropdownIndicator {...props}>
          {props.isFocused ? (
            <IoIosArrowUp size={18} color={indicatorColor} />
          ) : (
            <IoIosArrowDown size={18} color={indicatorColor} />
          )}
        </components.DropdownIndicator>
      </>
    );
  };

  const dropDownStyle = {
    control: (styles, { isFocused, isDisabled, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? "var(--disabled-input-color)"
        : "var(--white-color)",
      padding: "7px 13px 7px 8px",
      color: "var(--white-color)",
      boxShadow: "none",
      fontFamily: "var(--ff-secondary-reg)",
      fontSize: "var(--fs-base)",
      letterSpacing: "1.4",
      cursor: "pointer",
      border: "none",
      borderRadius: "8px",
      textTransform: "capitialize",
      border: isFocused
        ? "1px solid var(--border-color)"
        : "1px solid var(--border-color)",
      ...customStyle,

      ":hover": {
        ...styles[":hover"],
        borderColor: "var(--border-color)",
      },
      ":placeholder": {
        ...styles[":placeholder"],
        color: "var(--placeholder-color)",
      },
      ":active": {
        ...styles[":active"],
      },
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: placeholderColor,
        // ...(leftIcon && {marginLeft:"22px"})
      };
    },

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected && "var(--main-color)",
        color: isSelected && "var(--white-color)",
        padding: "8px 12px",
        fontFamily: "var(--ff-secondary-reg)",
        textTransform: "capitialize",

        ":active": {
          ...styles[":active"],
          color: "var(--text-color-black)",
        },
        ":hover": {
          ...styles[":hover"],
          color: "var(--white-color)",
          backgroundColor: "#6300b38f",
          cursor: "pointer",
        },
      };
    },

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "var(--header-links-color)",
        borderRadius: "14px",
        padding: "1px 10px",
        fontFamily: "var(--ff-secondary-reg)",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#fff",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      fontSize: "var(--fs-base)",
      color: "#fff",
      ":hover": {
        color: "#fff",
      },
    }),
  };
  return (
    <div
      className={`${[classes.Container].join(" ")}`}
      style={{ ...containerStyle }}
    >
      {" "}
      <style>{`
        .DropdownOptionContainer__menu {
          margin: 0px;
          border: 0px;
          border-radius:${optionContainerRadius};
          z-index: 1100 !important;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
          background-color: var(--white-color);
          color: var(--heading-color);
          top:calc( 100% + 4px );
        }   
        .DropdownOptionContainer__control {
          padding: 10px 10px 10px 4px          
        }
        .DropdownOptionContainer__input-container{
          padding:0px;
          margin:0px
        }
        .DropdownOptionContainer__menu-list{
          padding-top:0;
          padding-bottom:0;
        }
        .DropdownOptionContainer__single-value {
          color: ${singleValueColor ? singleValueColor : "var(--text-color)"} ;
        }
        .DropdownOptionContainer__option{
          border-radius:0;
        }
        .DropdownOptionContainer__option:last-child{
          border-end-start-radius:${optionContainerRadius};
          border-end-end-radius:${optionContainerRadius};
        }
        .DropdownOptionContainer__option:first-child{
          border-start-end-radius:${optionContainerRadius};
          border-start-start-radius:${optionContainerRadius};
        }
      `}</style>
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName && labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {label}
        </label>
      )}
      <div className={classes.dropdownContainer}>
        <Select
          value={value}
          onChange={(e) => {
            setter(e);
          }}
          placeholder={placeholder}
          isMulti={isMulti}
          isDisabled={disabled}
          isClearable={false}
          options={options}
          styles={{ ...dropDownStyle, ...styles }}
          classNamePrefix={customClassName}
          isSearchable={isSearchable}
          getOptionLabel={(option) => {
            return optionLabel ? option[optionLabel] : option.label;
          }}
          getOptionValue={(option) => {
            return optionValue ? option[optionValue] : option.value;
          }}
          components={{
            DropdownIndicator: (e) => DropdownIndicator(e),
            ...Components,
          }}
        />
        {error && (
          <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
        )}
      </div>
    </div>
  );
};

export default DropDown;
