const catchAsync = require("../utils/catchAsync");

const signupUser = catchAsync(async (req, res, next) => {});
const loginUser = catchAsync(async (req, res, next) => {});
const getMe = catchAsync(async (req, res, next) => {});
const updateUser = catchAsync(async (req, res, next) => {});
const changePassword = catchAsync(async (req, res, next) => {});

const resetPassOtp = catchAsync(async (req, res, next) => {});
const verifyResetPassOtp = catchAsync(async (req, res, next) => {});
const resetPassword = catchAsync(async (req, res, next) => {});

module.exports = {
  signupUser,
  loginUser,
  getMe,
  updateUser,
  changePassword,
  resetPassOtp,
  verifyResetPassOtp,
  resetPassword,
};
