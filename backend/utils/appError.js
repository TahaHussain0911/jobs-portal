class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // the error stack trace includes the point where this error was created, 
    // excluding the AppError class itself.
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
