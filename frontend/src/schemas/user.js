import * as yup from "yup";
export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").required("Email is required!"),
  name: yup.string().required("Name is required!"),
  password: yup.string().min(8).required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords donot match")
    .required("Confirm Password is required!"),
});
export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required!").email("Invalid Email!"),
  password: yup.string().min(8).required("Password is required!"),
});

