import { useState } from "react";
import ModalSkeleton from "../../../containers/ModalSkeleton";
import classes from "./SendOtp.module.css";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
const SendOtp = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const handleSendOtp=async()=>{
    // const response=await 
  }
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
            <Button label={"Cancel"} variant="secondary" />
            <Button label={"Submit"} onClick={handleSendOtp} />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default SendOtp;
