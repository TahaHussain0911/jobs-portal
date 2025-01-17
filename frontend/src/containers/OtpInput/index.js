import React from "react";
import classes from "./OtpInput.module.css";
import OTPInput from "react-otp-input";
import { mergeClass } from "../../helper/mergeClass";
const OtpInput = ({ otp, setOtp, error, errorText }) => {
  return (
    <>
      <div className={classes.otpContainer}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="tel"
          shouldAutoFocus={true}
          inputStyle={mergeClass(
            classes.OtpInput_style,
            error ? classes.errorBorder : ""
          )}
          renderInput={(props) => <input {...props} />}
        />
        {error && (
          <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
        )}
      </div>
    </>
  );
};

export default OtpInput;
