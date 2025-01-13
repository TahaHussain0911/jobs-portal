import React, { useState } from "react";
import classes from "./Login.module.css";
import Header from "../../containers/Header";
import { Container } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { GoogleSmall, LoginImg } from "../../helper/imagePath";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../../modals/ForgotPasswordModal";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassModal, setForgotPassModal] = useState(false);
  return (
    <>
      <Header />
      <div className={classes.loginPage}>
        <Container>
          <div className={classes.loginHeader}>
            <h1>Login to your Account</h1>
            <p>Welcome back! Select the below login methods.</p>
          </div>
          <div className={classes.loginContainer}>
            <div className={classes.loginForm}>
              <div className={classes.inputField}>
                <Input
                  label={"Email ID"}
                  placeholder={"Enter email id"}
                  value={email}
                  setter={setEmail}
                />
              </div>
              <div className={classes.inputField}>
                <Input
                  label={"Password"}
                  placeholder={"Enter Password"}
                  value={password}
                  setter={setPassword}
                  type={"password"}
                />
              </div>
              <div className={classes.forgotPass}>
                <span onClick={() => setForgotPassModal("send-otp")}>
                  Forgot Password?
                </span>
              </div>
              <div className={classes.submitBtn}>
                <Button label={"Login"} />
              </div>
              <div className={classes.loginOptions}>
                <div className={classes.separator}>
                  <span>or login with</span>
                </div>
                <div className={classes.options}>
                  <div className={classes.option}>
                    <img src={GoogleSmall} alt="Google Image" />
                  </div>
                </div>
              </div>
              <div className={classes.noAccount}>
                <p>
                  Don’t have an account?{" "}
                  <span onClick={() => navigate("/signup")}>Register</span>
                </p>
              </div>
            </div>
            <div className={classes.loginImg}>
              <img src={LoginImg} alt="Always Apply Login" />
            </div>
          </div>
        </Container>
      </div>
      {forgotPassModal && (
        <ForgotPasswordModal
          show={forgotPassModal}
          setShow={setForgotPassModal}
        />
      )}
    </>
  );
};

export default Login;
