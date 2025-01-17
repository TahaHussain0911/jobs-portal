import React, { useState } from "react";
import classes from "./ResetPassword.module.css";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import { Patch } from "../../../helper/axios";
import { useResetPass } from "../../../context/ResetPassContext";
const ResetPassword = ({ show, setShow, email }) => {
  const { contextPayload } = useResetPass();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    const params = {
      email: contextPayload?.email,
      newPassword,
      confirmNewPassword,
    };
    for (let key in params) {
      if (
        ["newPassword", "confirmNewPassword"].includes(key) &&
        params[key]?.length < 8
      ) {
        return toast.error(`Password should be atleast 8 characters long!`);
      }
    }
    if (newPassword !== confirmNewPassword) {
      return toast.error("Password and confirm password donot match");
    }
    setShow(false);
    return;
    setIsLoading(true);
    const response = await Patch("auth/reset-password", params);
    if (response) {
      toast.success("Password reset successfully!");
      setShow(false);
    }
    setIsLoading(false);
  };
  
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        heading={"Reset Password"}
        width={"700px"}
      >
        <div className={classes.resetPassword}>
          <div className={classes.inputField}>
            <Input
              value={newPassword}
              setter={setNewPassword}
              type={"password"}
              label={"Password"}
              placeholder={"Enter Password"}
            />
          </div>
          <div className={classes.inputField}>
            <Input
              value={confirmNewPassword}
              setter={setConfirmNewPassword}
              type={"password"}
              label={"Confirm Password"}
              placeholder={"Enter Password"}
            />
          </div>
          <div className={classes.actionBtns}>
            <Button
              label={isLoading ? "Updating..." : "Update"}
              disabled={isLoading}
              onClick={handleResetPassword}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default ResetPassword;
