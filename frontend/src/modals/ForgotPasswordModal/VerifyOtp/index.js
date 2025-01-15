import React, { useState } from "react";
import classes from "./VerifyOtp.module.css";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import OtpInput from "../../../containers/OtpInput";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import { useResetPass } from "../../../context/ResetPassContext";
const VerifyOtp = ({ show, setShow }) => {
  const [otp, setOtp] = useState("");
  const { setContextPayload, contextPayload } = useResetPass();
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyOtp = async () => {
    setShow("reset-password");
    return;
    if (otp?.length < 6) {
      return toast.error("Otp should be 6 characters");
    }
    const params = {
      email: contextPayload?.email,
      otp,
    };
    setIsLoading(true);
    const response = await Post("auth/verify-otp", params);
    if (response) {
      toast.success("Otp Verified successfully!");
      setContextPayload(params);
      setShow("verify-otp");
    }
    setIsLoading(false);
  };
  return (
    <>
      <ModalSkeleton show={show} setShow={setShow} heading={"Verify Otp"}>
        <div className={classes.verifyOtp}>
          <div className={classes.otpHeading}>
            <p>Enter one time password sent to</p>
            <p>tahahussain@gmail.com</p>
          </div>
          <div className={classes.otpMain}>
            <OtpInput otp={otp} setOtp={setOtp} />
          </div>
          <div className={classes.actionBtns}>
            <Button
              label={isLoading ? "Verifying..." : "Verify"}
              disabled={isLoading}
              onClick={handleVerifyOtp}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default VerifyOtp;
