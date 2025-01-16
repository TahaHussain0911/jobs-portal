import React, { useState } from "react";
import classes from "./Login.module.css";
import Header from "../../containers/Header";
import { Container } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { GoogleSmall, LoginImg } from "../../helper/imagePath";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../../modals/ForgotPasswordModal";
import { useFormik } from "formik";
import { Post } from "../../helper/axios";
import { toast } from "react-toastify";
import { loginSchema } from "../../schemas/user";
import { useDispatch } from "react-redux";
import { saveLoginData } from "../../store/auth/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (payload) => {
    const response = await Post("auth/login", payload);
    if (response) {
      toast.success("Login successfully!");
      dispatch(saveLoginData(response?.data));
    }
  };
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });
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
              <form onSubmit={handleSubmit}>
                <div className={classes.inputField}>
                  <Input
                    label={"Email ID"}
                    placeholder={"Enter email id"}
                    value={values.email}
                    onChange={handleChange}
                    name={"email"}
                    error={errors.email && touched.email}
                    errorText={errors.email}
                  />
                </div>
                <div className={classes.inputField}>
                  <Input
                    label={"Password"}
                    placeholder={"Enter Password"}
                    value={values.password}
                    onChange={handleChange}
                    type={"password"}
                    name={"password"}
                    error={errors.password && touched.password}
                    errorText={errors.password}
                  />
                </div>
                <div className={classes.forgotPass}>
                  <span onClick={() => setForgotPassModal("send-otp")}>
                    Forgot Password?
                  </span>
                </div>
                <div className={classes.submitBtn}>
                  <Button
                    label={isSubmitting ? "Wait..." : "Login"}
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </form>
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
