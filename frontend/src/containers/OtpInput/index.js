import React from "react";
import classes from "./OtpInput.module.css";
import OTPInput from "react-otp-input";
const OtpInput = ({ otp, setOtp }) => {
  return (
    <>
      <div className={classes.otpContainer}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          isInputNum={true}
          inputStyle={classes.OtpInput_style}
          shouldAutoFocus={true}
          renderInput={(props) => <input {...props} />}
        />
      </div>
    </>
  );
};

export default OtpInput;
