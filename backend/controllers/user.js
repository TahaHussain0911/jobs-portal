const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signupUser = catchAsync(async (req, res, next) => {
  console.log("Signupppp");

  const { email, password, confirmPassword } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return next(
      new AppError("User with this email already exists!", StatusCodes.CONFLICT)
    );
  }
  if (password !== confirmPassword) {
    return next(
      new AppError(
        "Password and confirm password donot match!",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const user_created = await User.create(req.body);
  const {
    password: hashPassword,
    otpVerified,
    passwordChangedAt,
    ...restUserDetails
  } = user_created?.toObject();
  const token = user_created.generateToken();
  res.status(StatusCodes.CREATED).json({
    token,
    user: restUserDetails,
  });
});
const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email }).select("+password");
  if (!foundUser) {
    return next(
      new AppError("Invalid email or password", StatusCodes.BAD_REQUEST)
    );
  }
  const isPasswordCorrect = await foundUser.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(
      new AppError("Invalid email or password", StatusCodes.BAD_REQUEST)
    );
  }
  const { password: userPass, ...restUserDetails } = foundUser.toObject();
  const token = foundUser.generateToken();
  res.status(StatusCodes.OK).json({
    token,
    user: restUserDetails,
  });
});
const getMe = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    return next(
      new AppError("Not Authorized! Please login!", StatusCodes.UNAUTHORIZED)
    );
  }
  res.status(StatusCodes.OK).json({
    user: foundUser,
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { name, contact } = req.body;
  const params = {
    name,
    contact,
    ...(req.file.filename && { photo: req.file.filename }),
  };
  const updateUser = await User.findByIdAndUpdate(userId, params, {
    new: true,
    runValidators: true,
  });
  if (!updateUser) {
    return next(
      new AppError("Not Authorized! Please login!", StatusCodes.UNAUTHORIZED)
    );
  }
  res.status(StatusCodes.OK).json({
    user: updateUser,
  });
});
const changePassword = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const foundUser = await User.findById(userId).select(
    "+password +passwordChangedAt"
  );
  if (!foundUser) {
    return next(
      new AppError("Not Authorized! Please login!", StatusCodes.UNAUTHORIZED)
    );
  }
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const params = {
    currentPassword,
    newPassword,
    confirmNewPassword,
  };
  for (let key in params) {
    if (!params[key] || params[key].length < 8) {
      return next(new AppError(`${key}: must be of atleast 8 characters`));
    }
  }
  const isPasswordCorrect = await User.comparePassword(currentPassword);
  if (!isPasswordCorrect) {
    return next(
      new AppError("Current Password is not correct!", StatusCodes.BAD_REQUEST)
    );
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new AppError(
        "Password and confirm password donot match!",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  foundUser.password = newPassword;
  await foundUser.save();
  const token = foundUser.generateToken();
  res.status(StatusCodes.OK).json({
    msg: "Password updated successfully",
    token,
  });
});

const resetPassOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email }).select("+otp +otpExpiresAt");
  if (!foundUser) {
    return next(new AppError("Invalid email!", StatusCodes.BAD_REQUEST));
  }
  await foundUser.generateOtp(next);
  await foundUser.save();
  res.status(StatusCodes.OK).json({
    msg: "Otp code send to your email!",
  });
});
const resendResetPassOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email }).select("+otp +otpExpiresAt");
  if (!foundUser) {
    return next(new AppError("Invalid email!", StatusCodes.BAD_REQUEST));
  }
  if (!foundUser?.otpExpiresAt) {
    return next(
      new AppError(
        "Request for otp first before resending code!",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  await foundUser.generateOtp(next);
  await foundUser.save();
  res.status(StatusCodes.OK).json({
    msg: "Otp code send to your email!",
  });
});
const verifyResetPassOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  const foundUser = await User.findOne({ email }).select(
    "+otp +otpExpiresAt +otpVerified"
  );
  if (!foundUser) {
    return next(new AppError("Invalid email!", StatusCodes.BAD_REQUEST));
  }
  if (!foundUser?.otp || !foundUser?.otpExpiresAt) {
    return next(
      new AppError("Request for otp first!", StatusCodes.BAD_REQUEST)
    );
  }
  const otpExpiryInMs = new Date(foundUser?.otpExpiresAt).getTime();
  if (otpExpiryInMs < Date.now()) {
    return next(
      new AppError(
        "OTP code expired! Request for another.",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  if (foundUser?.otp !== otp) {
    return next(
      new AppError(
        "OTP code invalid! Please try again!",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  foundUser.otp = undefined;
  foundUser.otpExpiresAt = undefined;
  foundUser.otpVerified = true;
  await foundUser.save();
  res.status(StatusCodes.OK).json({
    msg: "OTP code verified!",
  });
});
const resetPassword = catchAsync(async (req, res, next) => {
  const { email, newPassword, confirmNewPassword } = req.body;
  const foundUser = await User.findOne({ email }).select(
    "+password +passwordChangedAt +otpVerified"
  );
  if (!foundUser) {
    return next(new AppError("Invalid email!", StatusCodes.BAD_REQUEST));
  }
  if (!foundUser?.otpVerified) {
    return next(
      new AppError("Please verify otp first!", StatusCodes.BAD_REQUEST)
    );
  }
  if (newPassword?.length < 8) {
    return next(
      new AppError(
        "Password must be of atleast 8 characters!",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new AppError(
        "Password and confirm password donot match!",
        StatusCodes.CONFLICT
      )
    );
  }
  foundUser.otpVerified = false;
  foundUser.password = newPassword;
  await foundUser.save();
  res.status(StatusCodes.OK).json({
    msg: "Your password has been reset!",
  });
});

module.exports = {
  signupUser,
  loginUser,
  getMe,
  updateUser,
  changePassword,
  resetPassOtp,
  resendResetPassOtp,
  verifyResetPassOtp,
  resetPassword,
};
