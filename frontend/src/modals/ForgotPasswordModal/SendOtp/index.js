import { useState } from "react";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import classes from "./SendOtp.module.css";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Post } from "../../../helper/axios";
import { toast } from "react-toastify";
import { useResetPass } from "../../../context/ResetPassContext";
import { useFormik } from "formik";
import * as yup from "yup";
const SendOtp = ({ show, setShow }) => {
  const { setContextPayload } = useResetPass();
  const handleSendOtp = async (values) => {
    const response = await Post("auth/send-otp", values);
    if (response) {
      toast.success("Otp send successfully!");
      setContextPayload(values);
      setShow("verify-otp");
    }
  };
  const { values, handleChange, handleSubmit, isSubmitting, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .required("Email is required!")
          .email("Invalid Email!"),
      }),
      onSubmit: handleSendOtp,
    });

  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        heading={"Forgot Password?"}
        width={"700px"}
      >
        <div className={classes.forgotPassword}>
          <div className={classes.heading}>
            <p>Please enter your login email to receive a verification code.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputField}>
              <Input
                value={values?.email}
                onChange={handleChange}
                placeholder={"Enter Email"}
                label={"Email"}
                name={"email"}
                error={errors?.email && touched?.email}
                errorText={errors?.email}
              />
            </div>
            <div className={classes.actionBtns}>
              <Button
                label={"Cancel"}
                variant="secondary"
                disabled={isSubmitting}
              />
              <Button
                label={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default SendOtp;
