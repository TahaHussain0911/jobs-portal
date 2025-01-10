const express = require("express");
const {
  getMe,
  loginUser,
  signupUser,
  resetPassOtp,
  verifyResetPassOtp,
  resetPassword,
  updateUser,
  changePassword,
  resendResetPassOtp,
} = require("../controllers/user");
const UserRouter = express.Router();

UserRouter.post("/signup", signupUser).post("/login", loginUser);
UserRouter.post("/send-otp", resetPassOtp)
  .post("/resend-otp", resendResetPassOtp)
  .post("/verify-otp", verifyResetPassOtp);
UserRouter.patch("/reset-password", resetPassword);

UserRouter.get("/me", getMe);
UserRouter.patch("/update-user", updateUser);
UserRouter.patch("/change-password", changePassword);

module.exports = UserRouter;
