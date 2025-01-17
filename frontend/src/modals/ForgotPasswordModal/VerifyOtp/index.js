import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../../../components/Button";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import OtpInput from "../../../containers/OtpInput";
import { useResetPass } from "../../../context/ResetPassContext";
import classes from "./VerifyOtp.module.css";
import { Post } from "../../../helper/axios";

const VerifyOtp = ({ show, setShow }) => {
  const { setContextPayload, contextPayload } = useResetPass();
  const [seconds, setSeconds] = useState(120);
  const [resendLoading, setResendLoading] = useState(false);
  const handleVerifyOtp = async (values) => {
    const response = await Post("auth/verify-otp", values);
    if (response) {
      toast.success("Otp Verified successfully!");
      setContextPayload(values);
      setShow("reset-password");
    }
  };
  const { values, errors, touched, setFieldValue, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        otp: "",
        email: contextPayload?.email,
      },
      validationSchema: yup.object().shape({
        otp: yup
          .string()
          .min(6, "OTP should be atleast 6 characters")
          .required("Otp is required"),
      }),
      onSubmit: handleVerifyOtp,
    });

  const handleResendOtp = async () => {
    if (resendLoading) return;
    setResendLoading(true);
    const response = await Post("auth/resend-otp", {
      email: contextPayload?.email,
    });
    if (response) {
      toast.success("OTP resend successfully");
      setSeconds(120);
    }
    setResendLoading(false);
  };
  console.log(seconds, "seconds");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1 > 0 ? seconds - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <ModalSkeleton show={show} setShow={setShow} heading={"Verify Otp"}>
        <div className={classes.verifyOtp}>
          <div className={classes.otpHeading}>
            <p>Enter one time password sent to</p>
            <p>{contextPayload?.email || ""}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.otpMain}>
              <OtpInput
                otp={values?.otp}
                setOtp={(value) => setFieldValue("otp", value)}
                error={errors.otp && touched.otp}
                errorText={errors.otp}
              />
            </div>
            <div className={classes.expiry}>
              {seconds > 0 ? (
                <p className={classes.otpTimer}>
                  Your code will expire in{" "}
                  <span>
                    {String(Math.floor(seconds / 60)).padStart(2, "00")}:
                    {String(seconds % 60).padStart(2, "00")}
                  </span>
                </p>
              ) : (
                <p className={classes.otpExpired}>
                  Your otp has been expired{" "}
                  <span onClick={handleResendOtp}>
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </span>
                </p>
              )}
            </div>
            <div className={classes.actionBtns}>
              <Button
                label={isSubmitting ? "Verifying..." : "Verify"}
                disabled={isSubmitting}
                type="submit"
              />
            </div>
          </form>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default VerifyOtp;
