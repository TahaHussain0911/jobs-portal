import { useFormik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../containers/Header";
import { GoogleSmall } from "../../helper/imagePath";
import { signupSchema } from "../../schemas/user";
import classes from "./Signup.module.css";
import { Post } from "../../helper/axios";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = async (value, { setSubmitting }) => {
    const response = await Post("auth/signup", values);
    if (response) {
      toast.success("Signup Successfull!");
    }
  };
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit: handleSignup,
    });

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
            <form onSubmit={handleSubmit}>
              <div className={classes.inputField}>
                <Input
                  label={"Full Name"}
                  placeholder={"Enter Full Name"}
                  value={values.name}
                  onChange={handleChange}
                  name={"name"}
                  error={errors.name && touched.name}
                  errorText={errors.name}
                />
              </div>
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
                  name={"password"}
                  type={"password"}
                  error={errors.password && touched.password}
                  errorText={errors.password}
                />
              </div>
              <div className={classes.inputField}>
                <Input
                  label={"Confirm Password"}
                  placeholder={"Enter Confirm Password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  name={"confirmPassword"}
                  type={"password"}
                  error={errors.confirmPassword && touched.confirmPassword}
                  errorText={errors.confirmPassword}
                />
              </div>
              <div className={classes.submitBtn}>
                <Button
                  label={isSubmitting ? "Wait..." : "Register Now"}
                  type={"submit"}
                  disabled={isSubmitting}
                />
              </div>
            </form>
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
