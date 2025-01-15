import { useState } from "react";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import classes from "./SendOtp.module.css";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Post } from "../../../helper/axios";
import { toast } from "react-toastify";
import { useResetPass } from "../../../context/ResetPassContext";
const SendOtp = ({ show, setShow }) => {
  const { setContextPayload } = useResetPass();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSendOtp = async () => {
    setShow("verify-otp");
    return;
    const params = {
      email,
    };
    setIsLoading(true);
    const response = await Post("auth/send-otp", params);
    if (response) {
      toast.success("Otp send successfully!");
      setContextPayload(params);
      setShow("verify-otp");
    }
    setIsLoading(false);
  };
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
          <div className={classes.inputField}>
            <Input
              value={email}
              setter={setEmail}
              placeholder={"Enter Email"}
              label={"Email"}
            />
          </div>
          <div className={classes.actionBtns}>
            <Button label={"Cancel"} variant="secondary" disabled={isLoading} />
            <Button
              label={isLoading ? "Submitting..." : "Submit"}
              disabled={isLoading}
              onClick={handleSendOtp}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default SendOtp;
