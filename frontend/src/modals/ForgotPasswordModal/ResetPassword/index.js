import React, { useState } from "react";
import classes from "./ResetPassword.module.css";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import { Patch } from "../../../helper/axios";
import { useResetPass } from "../../../context/ResetPassContext";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../../schemas/user";
const ResetPassword = ({ show, setShow }) => {
  const { contextPayload } = useResetPass();
  const handleResetPassword = async (values) => {
    const response = await Patch("auth/reset-password", values);
    if (response) {
      toast.success("Password reset successfully!");
      setShow(false);
    }
  };
  const { values, errors, touched, handleSubmit, handleChange, isSubmitting } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmNewPassword: "",
        email: contextPayload?.email,
      },
      validationSchema: resetPasswordSchema,
      onSubmit: handleResetPassword,
    });

  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={(e) => {}}
        heading={"Reset Password"}
        width={"700px"}
      >
        <div className={classes.resetPassword}>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputField}>
              <Input
                value={values?.newPassword}
                onChange={handleChange}
                name={"newPassword"}
                type={"password"}
                label={"Password"}
                placeholder={"Enter Password"}
                error={errors?.newPassword && touched?.newPassword}
              />
            </div>
            <div className={classes.inputField}>
              <Input
                value={values?.confirmNewPassword}
                onChange={handleChange}
                name={"confirmNewPassword"}
                type={"password"}
                label={"Confirm Password"}
                placeholder={"Enter Password"}
                error={
                  errors?.confirmNewPassword && touched?.confirmNewPassword
                }
              />
            </div>
            <div className={classes.actionBtns}>
              <Button
                label={isSubmitting ? "Updating..." : "Update"}
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

export default ResetPassword;
