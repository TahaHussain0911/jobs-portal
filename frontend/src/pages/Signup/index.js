import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../containers/Header";
import { GoogleSmall } from "../../helper/imagePath";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Header />
      <div className={classes.loginPage}>
        <Container>
          <div className={classes.loginHeader}>
            <h1>Registration form</h1>
            <p>Register to apply for jobs of your choice all over the world.</p>
          </div>
          <div className={classes.loginContainer}>
            <div className={classes.inputField}>
              <Input
                label={"Full Name"}
                placeholder={"Enter Full Name"}
                value={name}
                setter={setName}
              />
            </div>
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
            <div className={classes.inputField}>
              <Input
                label={"Confirm Password"}
                placeholder={"Enter Confirm Password"}
                value={confirmPassword}
                setter={setConfirmPassword}
                type={"password"}
              />
            </div>
            <div className={classes.submitBtn}>
              <Button label={"Register Now"} />
            </div>
            <div className={classes.loginOptions}>
              <div className={classes.separator}>
                <span>or signup with</span>
              </div>
              <div className={classes.options}>
                <div className={classes.option}>
                  <img src={GoogleSmall} alt="Google Image" />
                </div>
              </div>
            </div>
            <div className={classes.noAccount}>
              <p>
                Have an account?{" "}
                <span onClick={() => navigate("/login")}>Login</span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Signup;
