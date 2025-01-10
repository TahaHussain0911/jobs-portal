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
const upload = require("../middlewares/image-upload");
const { authorizeUser } = require("../middlewares/authorization");
const UserRouter = express.Router();

UserRouter.post("/signup", signupUser).post("/login", loginUser);
UserRouter.post("/send-otp", resetPassOtp)
  .post("/resend-otp", resendResetPassOtp)
  .post("/verify-otp", verifyResetPassOtp);
UserRouter.patch("/reset-password", resetPassword);

UserRouter.use(authorizeUser);

UserRouter.get("/me", getMe);
UserRouter.patch("/update-user", upload.single("photo"), updateUser);
UserRouter.patch("/change-password", changePassword);

module.exports = UserRouter;
