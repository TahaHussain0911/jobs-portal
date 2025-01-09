const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/appError");

const routeNotFound = (req, res, next) => {
  next(
    new AppError(
      `Cannot find ${req.originalUrl} on this server`,
      StatusCodes.NOT_FOUND
    )
  );
};
module.exports = routeNotFound;
