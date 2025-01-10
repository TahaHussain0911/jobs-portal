const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../utils/credentials");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

const authorizeUser = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new AppError("Not authorized. Please login!", StatusCodes.UNAUTHORIZED)
    );
  }
  const token = authorization.split("Bearer ")[1];
  const user = jwt.verify(token, jwtSecretKey);
  console.log(user, "token");

  if (user?.exp < Math.floor(Date.now() / 1000)) {
    return next(
      new AppError(
        "Token expired! Please login again.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  const userExists = await User.findById(user?.userId).select(
    "+passwordChangedAt"
  );
  const passwordChangedInMs = new Date(userExists?.passwordChangedAt).getTime();
  if (user?.iat < Math.floor(passwordChangedInMs / 1000)) {
    return next(
      new AppError(
        "Password has been recently changed. Please login again!",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  req.user = { userId: user?.userId, email: user?.email, role: user?.role };
  next();
});
const authorizeAdmin = catchAsync((req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return next(
      new AppError(
        "Only admin can access this route!",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  next();
});

module.exports = {
  authorizeUser,
  authorizeAdmin,
};
