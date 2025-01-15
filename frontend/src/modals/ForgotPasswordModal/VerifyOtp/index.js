import React, { useState } from "react";
import classes from "./VerifyOtp.module.css";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import OtpInput from "../../../containers/OtpInput";
import Button from "../../../components/Button";
const VerifyOtp = ({ show, setShow, email }) => {
  const [otp, setOtp] = useState("");
  return (
    <>
      <ModalSkeleton show={show} setShow={setShow} heading={'Verify Otp'}>
        <div className={classes.verifyOtp}>
          <div className={classes.otpHeading}>
            <p>Enter one time password sent to</p>
            <p>tahahussain@gmail.com</p>
          </div>
          <div className={classes.otpMain}>
            <OtpInput otp={otp} setOtp={setOtp} />
          </div>
          <div className={classes.actionBtns}>
            <Button label={"Verify"} />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default VerifyOtp;
